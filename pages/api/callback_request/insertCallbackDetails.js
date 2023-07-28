// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO callback_details_tbl 
            (
              callback_id,status_id,attempt_count,start,end,aht,remarks,preferred_date,agent,encode_date
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.callback_id,
            req.body.status_id,
            req.body.attempt_count,
            req.body.start,
            req.body.end,
            req.body.aht,
            req.body.remarks,
            req.body.preferred_date,
            req.body.user,
            req.body.encode_date
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}