// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const dispatchRaw = `
          SELECT 
          vendors.vendor_name,
          disp.id,
          disp.disp_date,
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
          disp.received_by
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
          disp.received_by
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
          *
          FROM 
          otd_tbl
          WHERE 
          otd_date BETWEEN ? AND ?
          AND
          is_active = 1 
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

        const result = {
          dispatchRaw: resultDispatchRaw,
          dispatchPivot: resultDispatchPivot,
          checkRaw: resultCheckRaw,
          checkPivot: resultCheckPivot,
          otdRaw: resultOtdRaw,
          otdPivot: resultOtdPivot
        }

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}