// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE dispatch_activity SET
            action_taken = ?,
            remarks_id = ?,
            status_id = ?,
            completion_date = ?,
            abs_cbn_received_date = ?,
            received_by = ?,
            vergara_received_date = ?,
            received_by_vergara = ?,
            update_by = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
          req.body.action_taken,
          req.body.remarks_id,
          req.body.status_id,
          req.body.complete_date,
          req.body.abs_cbn_received_date,
          req.body.received_by,
          req.body.vergara_received_date,
          req.body.received_by_vergara,
          req.body.user,
          req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}