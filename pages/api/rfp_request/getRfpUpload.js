// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT * FROM upload_tbl WHERE record_type = 'rfp' AND ref_id = ?
            ORDER BY id DESC
        `;
        const valuesParam = [
            req.body.rfp_id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}