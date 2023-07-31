// import mysql from 'mysql2/promise';
import { query } from "../connection/connection";

export default async function handler(req, res) {


    try {
        const totalDispatchActivity = `
          SELECT
          COUNT(*) AS total
          FROM
          dispatch disp,
          dispatch_activity activity
          WHERE
          disp.id = activity.dispatch_id
          AND
          disp.is_active = 1 
        `;

        const totalActiveDispatchVendor = `
          SELECT 
          dispatch.id,
          dispatch.vendor_id,
          (
              SELECT 
              status.status 
              FROM 
              dispatch_activity AS activity
              LEFT JOIN activity_status_tbl AS STATUS ON activity.status_id = status.id
              WHERE 
              activity.dispatch_id = dispatch.id
              ORDER BY activity.id DESC LIMIT 1
          ) AS STATUS,
          (
              SELECT 
              remarks.remarks 
              FROM 
              dispatch_activity AS activity
              LEFT JOIN activity_remarks_tbl AS remarks ON activity.remarks_id = remarks.id
              WHERE 
              activity.dispatch_id = dispatch.id 
              ORDER BY activity.id DESC LIMIT 1
          ) AS remarks
          FROM 
          dispatch
          LEFT JOIN vendors ON vendors.id = dispatch.vendor_id
          WHERE  
          dispatch.vendor_id = vendors.id
          AND
          dispatch.is_active = 1 
          ORDER BY dispatch.id DESC
        `;

        const totalCallback = `
          SELECT
          COUNT(*) AS total
          FROM
          callback_tbl cb,
          callback_details_tbl cb_details
          WHERE
          cb.id = cb_details.callback_id
          AND
          cb.is_active = 1
        `;

        const totalOtd = `
          SELECT
          COUNT(*) AS total
          FROM
          otd_tbl
          WHERE
          is_active = 1
        `;


        const valuesParam = [
        ];

        const resultTotalDispatchActivity = await query({query: totalDispatchActivity, values: valuesParam});
        const resultTotalDispatchVendor = await query({query: totalActiveDispatchVendor, values: valuesParam});
        const resultTotalCallback = await query({query: totalCallback, values: valuesParam});
        const resultTotalOtd = await query({query: totalOtd, values: valuesParam});

        const result = {
          totalDispatchActivity: resultTotalDispatchActivity,
          totalActiveDispatchVendor: resultTotalDispatchVendor,
          totalCallback: resultTotalCallback,
          totalOtd: resultTotalOtd,
        }

        res.status(200).json(result)

    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}