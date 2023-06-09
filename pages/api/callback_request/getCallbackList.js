// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            cb.id,
            cb.omt_tracking_num,
            vendors.vendor_name,
            cb.encode_by,
            cb.encode_date,
            (
                SELECT 
                callback_status
                FROM 
                callback_details_tbl AS cb_details
                LEFT JOIN callback_status_tbl AS status ON cb_details.status_id = status.id
                ORDER BY cb_details.id DESC LIMIT 1
            ) AS status
            FROM 
            callback_tbl AS cb
            LEFT JOIN vendors ON vendors.id = cb.vendor_id
            WHERE  
            cb.is_active = 1 
            ORDER BY cb.id DESC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}