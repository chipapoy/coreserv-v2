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

    const [totalDispActivity,setTotalDispActivity] = useState(0);
    const [totalActiveDispVendor,setTotalActiveDispVendor] = useState(0);
    const [totalOngoingDisp,setTotalOngoingDisp] = useState(0);
    const [totalCallback,setTotalCallback] = useState(0);
    const [totalOtd,setTotalOtd] = useState(0);

    const pageTitle = 'Dashboard';

    const getDashboard = async () => {

      await axios.get('/api/dashboard_request/getDashboard')
      .then( result => {
        setTotalDispActivity(result.data.totalDispatchActivity[0].total);
        setTotalActiveDispVendor(result.data.totalActiveDispatchVendor.length);

        setTotalCallback(result.data.totalCallback[0].total);
        setTotalOtd(result.data.totalOtd[0].total);

        console.log(result.data.totalActiveDispatchVendor);

        const filteredOngoingDisp = result.data.totalActiveDispatchVendor.filter(row => {
          return row.remarks !== "COMPLETED";
        });

        setTotalOngoingDisp(filteredOngoingDisp.length);

      })
      .catch( err => {
        console.log(err)
      });
    }

    useEffect(() => {

      console.clear();

      getDashboard();

      // return () => {
      //   setTotalDispActivity(0);
      //   setTotalActiveDispVendor(0);
      // }
    
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
                <div className="card">
                  <div class="card-header">
                      <h3 class="card-title">Dispatch Summary</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-info mb-4">
                              <i className="fa fa-building"></i>
                            </div>
                            <p className=" mb-0 "> Total MDU Dispatch</p>
                            <h2 className="mb-2">
                              {totalActiveDispVendor}
                            </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-blue mb-4">
                              <i className="fa fa-motorcycle"></i> 
                            </div>
                            <p className=" mb-0 "> Total Dispatch Activity</p>
                            <h2 className="mb-2">
                              {totalDispActivity}
                            </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-green mb-4">
                              <i className="fa fa-refresh"></i>
                            </div>
                            <p className=" mb-0 "> On-going Dispatch</p>
                            <h2 className="mb-2">
                              {totalOngoingDisp}
                            </h2>
                        </div>
                        {/* <div className="col-xl-3 col-lg-6 col-md-12">
                            <div className="box-icon md rounded bg-green mb-4">
                              <i className="fa fa-circle-o"></i>
                            </div>
                            <p className=" mb-0 "> Total Loss</p>
                            <h2 className="mb-2">
                              45%
                              <span className="font-14 text-muted ml-1">weekly loss</span>
                            </h2>
                        </div> */}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div class="card-header">
                      <h3 class="card-title">Callback & OTD Summary</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-red mb-4">
                              <i className="fa fa-phone"></i>
                            </div>
                            <p className=" mb-0 "> Total Callback</p>
                            <h2 className="mb-2">
                              {totalCallback}
                            </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-orange mb-4">
                              <i className="fa fa-phone-square"></i> 
                            </div>
                            <p className=" mb-0 "> Total OTD</p>
                            <h2 className="mb-2">
                              {totalOtd}
                            </h2>
                        </div>
                        {/* <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="box-icon md rounded bg-green mb-4">
                              <i className="fa fa-refresh"></i>
                            </div>
                            <p className=" mb-0 "> On-going Dispatch</p>
                            <h2 className="mb-2">
                              {totalOngoingDisp}
                            </h2>
                        </div> */}
                        {/* <div className="col-xl-3 col-lg-6 col-md-12">
                            <div className="box-icon md rounded bg-green mb-4">
                              <i className="fa fa-circle-o"></i>
                            </div>
                            <p className=" mb-0 "> Total Loss</p>
                            <h2 className="mb-2">
                              45%
                              <span className="font-14 text-muted ml-1">weekly loss</span>
                            </h2>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </>
    )
}


export default Index