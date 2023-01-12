// import mysql from 'mysql2/promise';
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const sql = "SELECT terms as value, terms as label FROM payment_terms_tbl ORDER BY terms ASC";
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}