// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO vendors 
            (vendor_name,bldg_name,vendor_code,city,contact_person,contact_num,tier_segment,kam,account,account_type,payment_terms,soa_type) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.vendor_name,
            req.body.bldg_name,
            req.body.vendor_code,
            req.body.city,
            req.body.contact_person,
            req.body.contact_num,
            req.body.tier,
            req.body.kam,
            req.body.account,
            req.body.account_type,
            req.body.payment_terms,
            req.body.soa_type
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}