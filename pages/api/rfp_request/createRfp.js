// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            INSERT INTO rfp 
            (
                id,vendor_id,rfp_type_id,internal_order1,internal_order2,
                bill_period_from,bill_period_to,bill_month,
                date_bill_received,due_date,rfp_date,current_reading,
                previous_reading,consumption,rate,amount,vat_amount,interest,penalty,
                penalty_over_interest_vat_amount,surcharge,miscellaneuos,total_amount
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        const valuesParam = [
            req.body.id,
            req.body.vendor_id,
            req.body.rfp_type_id,
            req.body.internal_order1,
            req.body.internal_order2,
            req.body.bill_period_from,
            req.body.bill_period_to,
            req.body.bill_month,
            req.body.bill_date_received,
            req.body.due_date,
            req.body.rfp_date,
            req.body.current_reading,
            req.body.prev_reading,
            req.body.consumption,
            req.body.rate,
            req.body.amount,
            req.body.vat_amount,
            req.body.interest,
            req.body.penalty,
            req.body.penalty_over_interest,
            req.body.surcharge,
            req.body.misc,
            req.body.total_amount
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}