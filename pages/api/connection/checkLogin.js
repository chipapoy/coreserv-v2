
import { query } from "./connection";

export default async function handler(req, res) {


    try {
        const email = req.body.email;
        const password = req.body.password;
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const valuesParam = [email,password];

        const result = await query({query: sql, values: valuesParam});

        if(result.length > 0){
            res.status(200).json({ result: result[0] })
        }
        else{
            res.status(401).json({ result: 'Wrong password' })
        }
        

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
    
}