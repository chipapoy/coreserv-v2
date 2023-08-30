// import mysql from 'mysql2/promise';
import { query } from "../../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO disp_type_tbl 
            (
              disp_type,encode_by,encode_date  
            ) 
            VALUES (?,?,?)
        `;
        const valuesParam = [
            req.body.disp_type,
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