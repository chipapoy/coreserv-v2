// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
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
            rfp,
            vendors,
            sky_contact_details
            WHERE 
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