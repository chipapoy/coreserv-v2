// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO dispatch_activity 
            (
                dispatch_id,disp_date,pickup_date,crew_id,encode_by
            ) 
            VALUES (?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.dispatch_id,
            req.body.disp_date,
            req.body.pickup_date,
            req.body.crew_id,
            req.body.user
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}