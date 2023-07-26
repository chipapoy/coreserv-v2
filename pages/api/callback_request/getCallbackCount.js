// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT
            COUNT(*) AS Total
            FROM
            callback_details_tbl
            WHERE
            callback_id = ?
        `;
        const valuesParam = [
          req.body.callbackId
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}