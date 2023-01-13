// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO rfp_dashboard
            (rfp_id,bill_period_from,bill_period_to) 
            VALUES (?,?,?)
        `;
        const valuesParam = [
            req.body.id,
            req.body.bill_period_from,
            req.body.bill_period_to
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}