// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE otd_tbl SET
            concern = ?,
            crew_id = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
            req.body.concern,
            req.body.crew_id,
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}