// import mysql from 'mysql2/promise';
import { query } from "../../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE account_tbl SET
            account = ?,
            is_active = ?,
            update_by = ?,
            update_date = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
          req.body.account,
          req.body.is_active,
          req.body.user,
          req.body.update_date,
          req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}