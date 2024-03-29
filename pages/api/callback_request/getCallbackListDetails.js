
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT
            cb.id,
            omt_tracking_num,
            vendor_id,
            vendor_name
            FROM
            callback_tbl cb,
            vendors
            WHERE
            cb.vendor_id = vendors.id
            AND
            cb.id = ?
        `;
        const valuesParam = [
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}