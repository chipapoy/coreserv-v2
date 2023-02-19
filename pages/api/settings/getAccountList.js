// import mysql from 'mysql2/promise';
import { query } from "./connection/connection";

export default async function handler(req, res) {


    try {
        const sql = "SELECT account as value, account as label FROM account_tbl ORDER BY account ASC";
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}