// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT
            *
            FROM
            users
            WHERE
            email = ?
            AND
            password = ?
        `;
        const valuesParam = [
            req.body.email,
            req.body.password
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}