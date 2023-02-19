// import mysql from 'mysql2/promise';
const Test = (req, res) => {

    const { request } = req.query

    try {
        res.status(200).json({ request: request })
    } 
    catch (error) {
        res.status(500).json({ error: error })
    }

}


export default Test