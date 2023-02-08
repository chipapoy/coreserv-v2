import Axios from "axios";
import FormData from 'form-data'
import { useState } from "react";



const Test = () => {

    const [fileUpload,setFileUpload] = useState([]);

    const onFileChange = (e) => {

        const fileSize = e.target.files[0].size / (1024 * 1024);
        console.log(fileSize);
        
        setFileUpload({
            file: e.target.files[0]
        })
    }

    const onUpload = (e) => {
        console.log(fileUpload.file);

        const formData = new FormData();

        formData.append('file',fileUpload.file);
        formData.append('id',"test-id");

        Axios.post(
            '/api/testUpload',
            formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        )
        .then(res => {
            console.log("Result -> " + res)
        })
        .catch(err => {
            console.log("Error -> " + err)
        })
    }

    return (
        <div>
            <input type="file" name="file_upload" onChange={onFileChange} accept=".pdf"  />
            <button onClick={onUpload}>
                Upload
            </button>
        </div>
    );
}

export default Test