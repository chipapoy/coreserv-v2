// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            disp.id,
            disp.disp_date,
            CONCAT(crew.team_code,'/',crew.technician) AS crew,
            disp.action_taken,
            remarks.remarks,
            status.status,
            disp.completion_date,
            disp.pickup_date
            FROM 
            dispatch_activity AS disp
            LEFT JOIN activity_remarks_tbl AS remarks ON disp.remarks_id = remarks.id
            LEFT JOIN activity_status_tbl AS status ON disp.status_id = status.id
            LEFT JOIN crew_tbl AS crew ON disp.crew_id = crew.id
            WHERE 
            dispatch_id = ?
            AND
            disp.is_active = 1 
            ORDER BY disp.id DESC
        `;
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