// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO dispatch 
            (
                vendor_id,disp_type,check_num,check_date,ref_num,amount,pickup_date,or_num,or_date,encode_by,encode_date
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.vendor_id,
            req.body.disp_type,
            req.body.check_num,
            req.body.check_date,
            req.body.ref_number,
            req.body.amount,
            req.body.pickup_date,
            req.body.or_number,
            req.body.or_date,
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