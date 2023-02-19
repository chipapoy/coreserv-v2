// import mysql from 'mysql2/promise';
import { query } from "./connection/connection";

export default async function handler(req, res) {


    try {
        const sql = "SELECT soa_type as value, soa_type as label FROM soa_type_tbl ORDER BY soa_type ASC";
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}