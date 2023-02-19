// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            rfp_dashboard.id,
            rfp_dashboard.bill_period_from,
            rfp_dashboard.bill_period_to,
            CONCAT(rfp_dashboard.bill_period_from,' ',rfp_dashboard.bill_period_to) AS bill_period,
            rfp_dashboard.bill_month,
            rfp_dashboard.current_reading,
            rfp_dashboard.previous_reading,
            rfp_dashboard.consumption,
            rfp_dashboard.rate,
            rfp_dashboard.amount,
            rfp_dashboard.vat_amount,
            rfp_dashboard.interest,
            rfp_dashboard.penalty,
            rfp_dashboard.penalty_over_interest_vat_amount,
            rfp_dashboard.surcharge,
            rfp_dashboard.miscellaneuos,
            rfp_dashboard.total_amount,
            rfp_dashboard.date_bill_received,
            rfp_dashboard.due_date,
            rfp_dashboard.rfp_date,
            rfp.id,
            vendors.vendor_name,
            vendors.bldg_name,
            vendors.contact_num,
            rfp.tin_num,
            vendors.vendor_code,
            sky_contact_details.contact_person,
            sky_contact_details.contact_number,
            sky_contact_details.email_add,
            rfp.internal_order1,
            rfp.internal_order2,
            vendors.city,
            vendors.account
            FROM 
            rfp_dashboard,
            rfp,
            vendors,
            sky_contact_details
            WHERE 
            rfp_dashboard.rfp_id = rfp.id
            AND
            rfp.vendor_id = vendors.id
            AND
            rfp.sky_contact_id = sky_contact_details.id
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