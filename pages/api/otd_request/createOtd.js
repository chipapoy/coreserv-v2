// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO otd_tbl 
            (
              otd_date,
              omt_tracking_num,
              vendor_id,
              concern,
              crew_id,
              start,
              end,
              aht,
              agent_name,
              encode_by
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.otd_date,
            req.body.omt_tracking_num,
            req.body.vendor_id,
            req.body.concern,
            req.body.crew_id,
            req.body.start,
            req.body.end,
            req.body.aht,
            'Admin',
            'Admin'
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}