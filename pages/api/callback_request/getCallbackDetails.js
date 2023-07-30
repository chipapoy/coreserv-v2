
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT
            callback_id,
            status_id,
            callback_status,
            attempt_count,
            start,
            end,
            aht,
            agent,
            remarks,
            preferred_date
            FROM
            callback_details_tbl AS cb_details
            LEFT JOIN callback_status_tbl AS status ON cb_details.status_id = status.id
            WHERE
            callback_id = ?
            ORDER BY cb_details.id DESC
        `;
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