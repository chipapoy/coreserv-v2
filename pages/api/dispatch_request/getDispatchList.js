// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            dispatch.id,
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
            vendors
            WHERE 
            dispatch.vendor_id = vendors.id
            AND
            dispatch.is_active = 1 
            ORDER BY dispatch.id DESC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}