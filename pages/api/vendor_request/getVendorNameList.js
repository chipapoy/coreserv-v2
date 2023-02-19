// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
        SELECT 
        v.id AS value, 
        v.vendor_name AS label, 
        v.vendor_code,
        v.account,
        v.account_type,
        v.bldg_name,
        v.city,
        v.contact_num,
        v.contact_person,
        v.kam,
        v.payment_terms,
        v.soa_type,
        v.tier_segment,
        v.sky_contact_id,
        sky.contact_person AS sky_contact_person,
        sky.contact_number AS sky_contact_number,
        sky.email_add AS sky_email_add
        FROM 
        vendors AS v
        LEFT JOIN sky_contact_details AS sky ON v.sky_contact_id = sky.id
        WHERE 
        v.status = 1 
        ORDER BY v.vendor_name ASC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}