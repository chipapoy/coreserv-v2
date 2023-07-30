import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO callback_tbl 
            (
                omt_tracking_num,vendor_id,encode_by,encode_date
            ) 
            VALUES (?,?,?,?)
        `;
        const valuesParam = [
            req.body.omt_tracking_num,
            req.body.vendor_id,
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