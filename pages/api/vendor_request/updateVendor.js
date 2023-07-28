// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            UPDATE vendors SET
            vendor_name = ?,
            vendor_code = ?,
            tin_num = ?,
            address = ?,
            bldg_name = ?,
            city = ?,
            contact_person = ?,
            contact_num = ?,
            kam = ?,
            tier_segment = ?,
            account = ?,
            account_type = ?,
            payment_terms = ?,
            soa_type = ?,
            bank_details = ?,
            remarks = ?,
            moa_duration = ?,
            moa_status = ?,
            terms = ?,
            auto_renewal = ?,
            with_penalty = ?,
            sky_contact_id = ?,
            update_by = ?,
            update_date = ?
            WHERE
            id = ?
        `;
        const valuesParam = [
            req.body.vendor_name,
            req.body.vendor_code,
            req.body.tin_num,
            req.body.address,
            req.body.bldg_name,
            req.body.city,
            req.body.contact_person,
            req.body.contact_num,
            req.body.kam,
            req.body.tier,
            req.body.account,
            req.body.account_type,
            req.body.payment_terms,
            req.body.soa_type,
            req.body.bank_details,
            req.body.remarks,
            req.body.moa_duration,
            req.body.moa_status,
            req.body.terms,
            req.body.auto_renew,
            req.body.with_penalty,
            req.body.sky_contact_id,
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