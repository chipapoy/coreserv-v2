// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql_update = `
          UPDATE dispatch SET is_active = 0 WHERE id = ?
        `;
        const valuesParam_update = [
            req.body.rec_id
        ];

        const sql_logs = `
          INSERT INTO activity_logs_tbl
          (
            record_id,module_type,activity_type,data,username
          )
          VALUES (?,?,?,?,?)
        `;
        const valuesParam_logs = [
            req.body.rec_id,
            req.body.module,
            "delete",
            JSON.stringify(req.body),
            "admin"
        ];

        const result_update = await query({query: sql_update, values: valuesParam_update});
        const result_logs = await query({query: sql_logs, values: valuesParam_logs});

        res.status(200).json(result_update,result_logs)
        // res.status(200).json(result_logs)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}