// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE rfp SET
            internal_order1 = ?,
            internal_order2 = ?,
            particulars = ?,
            bill_period_from = ?,
            bill_period_to = ?,
            bill_month = ?,
            date_bill_received = ?,
            due_date = ?,
            rfp_date = ?,
            current_reading = ?,
            previous_reading = ?,
            consumption = ?,
            rate = ?,
            amount = ?,
            vat_amount = ?,
            interest = ?,
            penalty = ?,
            penalty_over_interest_vat_amount = ?,
            surcharge = ?,
            miscellaneuos = ?,
            total_amount = ?,
            update_by = ?,
            update_date = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
            req.body.internal_order1,
            req.body.internal_order2,
            req.body.particulars,
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
            req.body.total_amount,
            req.body.user,
            req.body.update_date,
            req.body.id
        ];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}