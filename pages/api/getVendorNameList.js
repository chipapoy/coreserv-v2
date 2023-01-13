// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
        SELECT 
        id as value, 
        vendor_name as label, 
        vendor_code,
        account,
        account_type,
        bldg_name,
        city,
        contact_num,
        contact_person,
        kam,
        payment_terms,
        soa_type,
        tier_segment 
        FROM 
        vendors 
        WHERE 
        status = 1 
        ORDER BY vendor_name ASC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}