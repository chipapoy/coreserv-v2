import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import MUIDataTable, { TableHead } from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import ReceiptIcon from "@mui/icons-material/Receipt";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

    const [data,setData] = useState([]);

    const pageTitle = 'Dashboard';

    useEffect(() => {

        console.log(sessionStorage);
    
    }, []);

    return (
        <>
            <Head>
                <title>Coreserv</title>
            </Head>
            <div id="main_content">

                <Sidemenu />
                {/* <ToastContainer /> */}
                <div className="page">
                    <Topmenu />
                    <div className="section-body">
                        <div className="container-fluid">
                            <h4>{pageTitle}</h4>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}


export default Index