// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            otd.id,
            otd.otd_date,
            otd.omt_tracking_num,
            otd.vendor_id,
            vendors.vendor_name,
            crew_tbl.id as crew_id,
            crew_tbl.team_code,
            crew_tbl.technician,
            otd.concern,
            otd.start,
            otd.end,
            otd.aht,
            otd.agent_name,
            otd.encode_by,
            otd.encode_date
            FROM 
            otd_tbl AS otd
            LEFT JOIN vendors ON vendors.id = otd.vendor_id
            LEFT JOIN crew_tbl ON crew_tbl.id = otd.crew_id
            WHERE  
            otd.is_active = 1 
            AND
            otd.id = ?
        `;

        const valuesParam = [
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}