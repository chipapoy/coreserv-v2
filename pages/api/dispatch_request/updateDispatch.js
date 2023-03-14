// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE dispatch SET
            check_num = ?,
            check_date = ?,
            ref_num = ?,
            amount = ?,
            or_num = ?,
            or_date = ?,
            pickup_date = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
          req.body.check_num,
          req.body.check_date,
          req.body.ref_number,
          req.body.amount,
          req.body.or_number,
          req.body.or_date,
          req.body.pickup_date,
          req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}