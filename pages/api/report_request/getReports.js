// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const dispatchRaw = `
          SELECT 
          vendors.vendor_name,
          disp.id,
          disp.disp_date,
          dispatch.or_date,
          CONCAT(crew.team_code,'/',crew.technician) AS crew,
          disp.action_taken,
          remarks.remarks,
          status.status,
          disp.completion_date,
          disp.pickup_date,
          disp.remarks_id,
          disp.status_id,
          disp.crew_id,
          disp.abs_cbn_received_date,
          disp.received_by,
          disp.vergara_received_date,
          disp.received_by_vergara
          FROM 
          dispatch_activity AS disp
          LEFT JOIN dispatch AS dispatch ON disp.dispatch_id = dispatch.id
          LEFT JOIN vendors AS vendors ON dispatch.vendor_id = vendors.id 
          LEFT JOIN activity_remarks_tbl AS remarks ON disp.remarks_id = remarks.id
          LEFT JOIN activity_status_tbl AS STATUS ON disp.status_id = status.id
          LEFT JOIN crew_tbl AS crew ON disp.crew_id = crew.id
          WHERE 
          disp.disp_date BETWEEN ? AND ?
          AND
          disp.is_active = 1 
        `;

        const dispatchPivot = `
          SELECT
          status.status,
          ( 
            SELECT COUNT(*) 
            FROM 
            dispatch_activity disp 
            WHERE 
            disp.disp_date BETWEEN ? AND ? 
            AND 
            disp.is_active = 1 
            AND 
            disp.status_id = status.id
          ) AS total
          FROM
          activity_status_tbl STATUS
        `;

        const checkRaw = `
          SELECT 
          vendors.vendor_name,
          disp.id,
          disp.disp_date,
          dispatch.or_date,
          CONCAT(crew.team_code,'/',crew.technician) AS crew,
          disp.action_taken,
          remarks.remarks,
          status.status,
          disp.completion_date,
          disp.pickup_date,
          disp.remarks_id,
          disp.status_id,
          disp.crew_id,
          disp.abs_cbn_received_date,
          disp.received_by,
          disp.vergara_received_date,
          disp.received_by_vergara
          FROM 
          dispatch_activity AS disp
          LEFT JOIN dispatch AS dispatch ON disp.dispatch_id = dispatch.id
          LEFT JOIN vendors AS vendors ON dispatch.vendor_id = vendors.id 
          LEFT JOIN activity_remarks_tbl AS remarks ON disp.remarks_id = remarks.id
          LEFT JOIN activity_status_tbl AS STATUS ON disp.status_id = status.id
          LEFT JOIN crew_tbl AS crew ON disp.crew_id = crew.id
          WHERE 
          dispatch.or_date BETWEEN ? AND ?
          AND
          disp.is_active = 1 
        `;
        
        const checkPivot = `
          SELECT
          remarks.remarks,
          ( 
            SELECT COUNT(*) 
            FROM 
            dispatch disp,
            dispatch_activity activity 
            WHERE 
            disp.id = activity.dispatch_id
            AND
            disp.or_date BETWEEN ? AND ?
            AND 
            activity.is_active = 1 
            AND 
            activity.remarks_id = remarks.id
          ) AS total
          FROM
          activity_remarks_tbl remarks
        `;

        const otdRaw = `
          SELECT 
          otd.otd_date,
          otd.omt_tracking_num,
          vendor.vendor_name,
          otd.concern,
          CONCAT(crew.team_code,'/',crew.technician) AS crew,
          otd.start,
          otd.end,
          otd.aht
          FROM 
          otd_tbl otd,
          vendors vendor,
          crew_tbl crew
          WHERE 
          otd.vendor_id = vendor.id
          AND
          otd.crew_id = crew.id 
          AND
          otd.otd_date BETWEEN ? AND ?
          AND
          otd.is_active = 1 
        `;
        
        const otdPivot = `
          SELECT
          concern,
          COUNT(*) AS total
          FROM
          otd_tbl
          WHERE
          otd_date BETWEEN ? AND ?
          AND
          is_active = 1
          GROUP BY concern
          ORDER BY concern ASC
        `;

        const callbackRaw = `
          SELECT
          DATE(cb_details.start) AS callback_date,
          cb.omt_tracking_num,
          vendor.vendor_name,
          cb_status.callback_status,
          cb_details.attempt_count,
          cb_details.start,
          cb_details.end,
          cb_details.aht,
          cb_details.agent,
          preferred_date
          FROM
          callback_tbl cb,
          vendors vendor,
          callback_details_tbl cb_details,
          callback_status_tbl cb_status
          WHERE
          cb.id = cb_details.callback_id
          AND
          cb.vendor_id = vendor.id
          AND
          cb_details.status_id = cb_status.id
          AND
          cb.is_active = 1
          AND
          DATE(cb_details.start) BETWEEN ? AND ?
          ORDER BY cb_details.id DESC
        `;
        
        const callbackPivot = `
          SELECT
          cb_status.callback_status AS status,
          ( 
            SELECT 
            COUNT(*) 
            FROM 
            callback_details_tbl cb_details
            WHERE 
            cb_details.status_id = cb_status.id
            AND
            DATE(cb_details.start) BETWEEN ? AND ?
            AND 
            cb_details.is_active = 1 
          ) AS total
          FROM
          callback_status_tbl cb_status
        `;

        const rfpElectricalRaw = `
          SELECT 
          rfp.id,
          vendors.vendor_name,
          vendors.bldg_name,
          vendors.address,
          vendors.contact_num,
          vendors.tin_num,
          vendors.vendor_code,
          sky_contact_details.contact_person,
          sky_contact_details.contact_number,
          sky_contact_details.email_add,
          rfp.internal_order1,
          rfp.internal_order2,
          vendors.city,
          vendors.account,
          rfp_type_tbl.rfp_type,
          rfp.bill_period_from,
          rfp.bill_period_to,
          CONCAT(rfp.bill_period_from,' ',rfp.bill_period_to) AS bill_period,
          rfp.bill_month,
          rfp.current_reading,
          rfp.previous_reading,
          rfp.consumption,
          rfp.rate,
          rfp.amount,
          rfp.vat_amount,
          rfp.interest,
          rfp.penalty,
          rfp.penalty_over_interest_vat_amount,
          rfp.surcharge,
          rfp.miscellaneuos,
          rfp.total_amount,
          rfp.date_bill_received,
          rfp.due_date,
          rfp.rfp_date
          FROM 
          rfp,
          vendors,
          sky_contact_details,
          rfp_type_tbl
          WHERE 
          rfp.vendor_id = vendors.id
          AND
          vendors.sky_contact_id = sky_contact_details.id
          AND
          rfp.rfp_type_id = rfp_type_tbl.id
          AND
          rfp.status = 1 
          AND
          rfp.rfp_type_id = 1
          AND
          rfp.rfp_date BETWEEN ? AND ?
          ORDER BY rfp.id DESC
        `;
        
        const rfpElectricalPivot = `
          SELECT 
          vendor_name,
          COUNT(*) AS total
          FROM 
          vendors,
          rfp
          WHERE
          rfp.vendor_id = vendors.id
          AND
          rfp.status = 1 
          AND
          rfp.rfp_type_id = 1
          AND
          rfp.rfp_date BETWEEN ? AND ?
          GROUP BY vendor_name
          ORDER BY vendor_name ASC
        `;

        const rfpRentalRaw = `
          SELECT 
          rfp.id,
          vendors.vendor_name,
          vendors.bldg_name,
          vendors.address,
          vendors.contact_num,
          vendors.tin_num,
          vendors.vendor_code,
          sky_contact_details.contact_person,
          sky_contact_details.contact_number,
          sky_contact_details.email_add,
          rfp.internal_order1,
          rfp.internal_order2,
          vendors.city,
          vendors.account,
          rfp_type_tbl.rfp_type,
          rfp.bill_period_from,
          rfp.bill_period_to,
          CONCAT(rfp.bill_period_from,' ',rfp.bill_period_to) AS bill_period,
          rfp.bill_month,
          rfp.current_reading,
          rfp.previous_reading,
          rfp.consumption,
          rfp.rate,
          rfp.amount,
          rfp.vat_amount,
          rfp.interest,
          rfp.penalty,
          rfp.penalty_over_interest_vat_amount,
          rfp.surcharge,
          rfp.miscellaneuos,
          rfp.total_amount,
          rfp.date_bill_received,
          rfp.due_date,
          rfp.rfp_date
          FROM 
          rfp,
          vendors,
          sky_contact_details,
          rfp_type_tbl
          WHERE 
          rfp.vendor_id = vendors.id
          AND
          vendors.sky_contact_id = sky_contact_details.id
          AND
          rfp.rfp_type_id = rfp_type_tbl.id
          AND
          rfp.status = 1 
          AND
          rfp.rfp_type_id = 2
          AND
          rfp.rfp_date BETWEEN ? AND ?
          ORDER BY rfp.id DESC
        `;
        
        const rfpRentalPivot = `
          SELECT 
          vendor_name,
          COUNT(*) AS total
          FROM 
          vendors,
          rfp
          WHERE
          rfp.vendor_id = vendors.id
          AND
          rfp.status = 1 
          AND
          rfp.rfp_type_id = 2
          AND
          rfp.rfp_date BETWEEN ? AND ?
          GROUP BY vendor_name
          ORDER BY vendor_name ASC
        `;

        const valuesParam = [
          req.body.start,
          req.body.end
        ];

        const resultDispatchRaw = await query({query: dispatchRaw, values: valuesParam});
        const resultDispatchPivot = await query({query: dispatchPivot, values: valuesParam});
        const resultCheckRaw = await query({query: checkRaw, values: valuesParam});
        const resultCheckPivot = await query({query: checkPivot, values: valuesParam});
        const resultOtdRaw = await query({query: otdRaw, values: valuesParam});
        const resultOtdPivot = await query({query: otdPivot, values: valuesParam});
        const resultCallbackRaw = await query({query: callbackRaw, values: valuesParam});
        const resultCallbackPivot = await query({query: callbackPivot, values: valuesParam});
        const resultRfpElectricalRaw = await query({query: rfpElectricalRaw, values: valuesParam});
        const resultRfpElectricalPivot = await query({query: rfpElectricalPivot, values: valuesParam});
        const resultRfpRentalRaw = await query({query: rfpRentalRaw, values: valuesParam});
        const resultRfpRentalPivot = await query({query: rfpRentalPivot, values: valuesParam});

        const result = {
          dispatchRaw: resultDispatchRaw,
          dispatchPivot: resultDispatchPivot,
          checkRaw: resultCheckRaw,
          checkPivot: resultCheckPivot,
          otdRaw: resultOtdRaw,
          otdPivot: resultOtdPivot,
          callbackRaw: resultCallbackRaw,
          callbackPivot: resultCallbackPivot,
          rfpElectricalRaw: resultRfpElectricalRaw,
          rfpElectricalPivot: resultRfpElectricalPivot,
          rfpRentalRaw: resultRfpRentalRaw,
          rfpRentalPivot: resultRfpRentalPivot
        }

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}