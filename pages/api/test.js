// import mysql from 'mysql2/promise';
const Test = (req, res) => {

    try {
        res.status(200).json({ name: 'John Doe' })
    } 
    catch (error) {
        res.status(500).json({ error: error })
    }

}


export default Test