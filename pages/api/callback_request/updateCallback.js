// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE callback_tbl SET
            omt_tracking_num = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
            req.body.omt_tracking_num,
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}