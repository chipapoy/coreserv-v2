// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {

    
    try {
        const sql = `
            SELECT
            v.id,
            v.vendor_name,
            v.bldg_name,
            v.vendor_code,
            v.tin_num,
            v.address,
            v.city,
            v.contact_person,
            v.contact_num,
            v.tier_segment,
            v.kam,
            v.account,
            v.account_type,
            v.payment_terms,
            v.soa_type,
            v.bank_details,
            v.remarks,
            v.moa_duration,
            v.terms,
            v.moa_status,
            v.auto_renewal,
            v.with_penalty,
            v.sky_contact_id,
            s.contact_person as sky_contact_person
            FROM 
            vendors AS v
            LEFT JOIN sky_contact_details AS s ON 
            v.sky_contact_id = s.id
            WHERE v.id = ? 
            AND 
            v.status = 1 
            ORDER BY v.id DESC`;
        const valuesParam = [
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}