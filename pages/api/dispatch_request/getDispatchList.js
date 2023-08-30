// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const sql = `
            SELECT 
            dispatch.id,
            dispatch.check_num,
            dispatch.check_date,
            dispatch.ref_num,
            vendors.vendor_name,
            dispatch.amount,
            dispatch.pickup_date,
            dispatch.or_num,
            dispatch.or_date,
            dispatch.action_taken,
            CASE WHEN dispatch.remarks <> NULL THEN dispatch.remarks ELSE '-' END AS remarks,
            dispatch.team_code,
            dispatch.team_assigned,
            dispatch.abs_cbn_received_date,
            dispatch.received_by,
            (
                SELECT 
                status.status 
                FROM 
                dispatch_activity AS activity
                LEFT JOIN activity_status_tbl AS STATUS ON activity.status_id = status.id
                WHERE 
                activity.dispatch_id = dispatch.id
                ORDER BY activity.id DESC LIMIT 1
            ) AS status,
            (
                SELECT 
                remarks.remarks 
                FROM 
                dispatch_activity AS activity
                LEFT JOIN activity_remarks_tbl AS remarks ON activity.remarks_id = remarks.id
                WHERE 
                activity.dispatch_id = dispatch.id 
                ORDER BY activity.id DESC LIMIT 1
            ) AS remarks,
            (
                SELECT CONCAT(crew.team_code,',',crew.technician) FROM dispatch_activity activity, crew_tbl crew WHERE activity.dispatch_id = dispatch.id AND activity.crew_id = crew.id ORDER BY activity.id DESC LIMIT 1
            ) AS crew,
            (
                SELECT 
                disp_type
                FROM 
                disp_type_tbl
                WHERE 
                disp_type_tbl.id = dispatch.disp_type
            ) AS disp_type
            FROM 
            dispatch
            LEFT JOIN vendors ON vendors.id = dispatch.vendor_id
            WHERE  
            dispatch.vendor_id = vendors.id
            AND
            dispatch.is_active = 1 
            ORDER BY dispatch.id DESC
        `;
        const valuesParam = [];

        const result = await query({query: sql, values: valuesParam});

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}