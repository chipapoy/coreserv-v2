// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            dispatch.id,
            dispatch.disp_type,
            dispatch.check_num,
            dispatch.check_date,
            dispatch.ref_num,
            vendors.vendor_name,
            dispatch.amount,
            dispatch.pickup_date,
            dispatch.or_num,
            dispatch.or_date,
            dispatch.action_taken,
            dispatch.remarks,
            dispatch.team_code,
            dispatch.team_assigned,
            dispatch.abs_cbn_received_date,
            dispatch.received_by
            FROM 
            dispatch,
            vendors,
            disp_type_tbl AS dispType
            WHERE 
            dispatch.vendor_id = vendors.id
            AND
            dispatch.disp_type = dispType.id
            AND
            dispatch.is_active = 1 
            AND
            dispatch.id = ?
            ORDER BY dispatch.id DESC
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