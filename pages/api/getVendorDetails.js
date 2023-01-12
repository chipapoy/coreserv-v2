// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {

    
    try {
        const sql = "SELECT * FROM vendors WHERE id = ? AND status = 1 ORDER BY id DESC";
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