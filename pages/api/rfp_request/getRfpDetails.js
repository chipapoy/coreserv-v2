// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {

    
    try {
        const sql = `
            SELECT 
            rfp.id,
            rfp.vendor_id,
            vendors.vendor_name,
            vendors.bldg_name,
            vendors.contact_num,
            vendors.tin_num,
            vendors.vendor_code,
            vendors.address,
            vendors.city,
            vendors.account,
            vendors.kam,
            rfp.sky_contact_id,
            sky_contact_details.contact_person,
            sky_contact_details.contact_number,
            sky_contact_details.email_add,
            rfp.internal_order1,
            rfp.internal_order2,
            rfp.particulars,
            DATE_FORMAT(rfp.bill_period_from,'%Y-%m-%d') AS bill_period_from,
            DATE_FORMAT(rfp.bill_period_to,'%Y-%m-%d') AS bill_period_to,
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
            rfp.rfp_type_id,
            rfp_type_tbl.rfp_type,
            DATE_FORMAT(rfp.date_bill_received,'%Y-%m-%d') AS date_bill_received,
            DATE_FORMAT(rfp.due_date,'%Y-%m-%d') AS due_date,
            DATE_FORMAT(rfp.rfp_date,'%Y-%m-%d') AS rfp_date
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
            rfp.status = 1
            AND
            rfp.id = ?
            AND
            rfp.rfp_type_id = rfp_type_tbl.id
        `;
        const valuesParam = [
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message, id: req.body })
    }
}