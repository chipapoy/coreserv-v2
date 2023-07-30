
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            id as value,
            callback_status AS label
            FROM 
            callback_status_tbl
            WHERE 
            is_active = 1 
            ORDER BY id ASC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}