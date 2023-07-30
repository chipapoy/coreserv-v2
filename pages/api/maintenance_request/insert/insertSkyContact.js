// import mysql from 'mysql2/promise';
import { query } from "../../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO sky_contact_details 
            (
              contact_person,contact_number,email_add,encode_by,encode_date  
            ) 
            VALUES (?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.contact_person,
            req.body.contact_number,
            req.body.email_add,
            req.body.user,
            req.body.encode_date
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}