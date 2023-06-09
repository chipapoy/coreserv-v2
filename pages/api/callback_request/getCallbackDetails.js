// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT
            callback_id,
            status_id,
            attempt_count,
            start,
            end,
            agent_id,
            remarks,
            preferred_date
            FROM
            callback_details_tbl
            WHERE
            is_active = 1
            ORDER BY id DESC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}