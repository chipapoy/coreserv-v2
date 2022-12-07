// import mysql from 'mysql2/promise';

export default function handler(req, res) {

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'mtsingson',
    //     password: 'akosimik13',
    //     database: 'coreserv_db'
    // });

    try {
        // const query = "SELECT * FROM vendors";

        // const [result] = await connection.execute(query);
        // connection.end();
        res.status(200).json({ name: 'John Doe' })
    } 
    catch (error) {
        res.status(500).json({ error: error })
    }

    


    
}