import mysql from 'mysql2/promise';

export async function query({query,values = []}){

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'coreserv_db',
        password: 'coreserv_db',
        database: 'coreserv_db'
    });

    try {
        const [results] = await connection.execute(query, values);
        connection.end();

        // res.status(200).json({ result: result })
        return results;

    } 
    catch (error) {
        throw Error(error.message)
    }

}