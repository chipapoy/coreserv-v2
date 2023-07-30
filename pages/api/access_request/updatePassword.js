import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
          UPDATE users SET
          password = ?
          WHERE
          id = ?
        `;
        const valuesParam = [
            req.body.new_password,
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result[0])

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}