// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            *
            FROM 
            dispatch,
            rfp,
            vendors
            WHERE 
            dispatch.rfp_id = rfp.id
            AND
            rfp.vendor_id = vendors.id
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