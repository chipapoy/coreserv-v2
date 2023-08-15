import formidable from 'formidable-serverless';
import { query } from "./connection/connection";
import uniqueId from 'uniqid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res){

  const form = new formidable.IncomingForm();

  form.uploadDir = "../../../../xampp/htdocs/public/uploads/";
  form.keepExtensions = true;
  form.maxFileSize = 5*1024*1024; // 5mb
  

  form.parse(req, async (err, fields, files) => {

    if (err) {
      // res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      // res.end(String(err));

      res.status(500).json({ error: String(err) })
    }
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify({ fields, files }, null, 2));
    // const test = { data: files.file.path.split('\\')[2] };
    try {
      const sql = `
          INSERT INTO upload_tbl 
          (ref_id,record_type,original_name,file_name,size,file_path,upload_by) 
          VALUES (?,?,?,?,?,?,?,?)
      `;
      const valuesParam = [
          fields.ref_id,
          fields.rec_type,
          files.file.name,
          files.file.path.split('\\')[2],
          files.file.size / (1024 * 1024),
          files.file.path,
          fields.user
      ];
  
      const queryResult =  await query({query: sql, values: valuesParam});
  
      const result = { message: queryResult };

      res.status(200).json({ fields, files, result });
  
    } 
    catch (error) {
      res.status(500).json({ message: String(err) })
    }

  });
};