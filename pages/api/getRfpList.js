// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
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
            ORDER BY rfp.id DESC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}