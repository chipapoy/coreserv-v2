// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
        SELECT 
        id as value,
        contact_person as label,
        contact_number,
        email_add
        FROM 
        sky_contact_details 
        WHERE 
        is_active = 1 
        ORDER BY contact_person ASC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}