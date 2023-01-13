// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE rfp SET
            vendor_id = ?,
            sky_contact_id = ?,
            internal_order1 = ?,
            internal_order2 = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
            req.body.vendor_id,
            req.body.sky_contact_id,
            req.body.internal_order1,
            req.body.internal_order2,
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}