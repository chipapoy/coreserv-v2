import Link from 'next/link';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import VendorSettings from "../../components/Settings/VendorSettings";
import DispatchSettings from "../../components/Settings/DispatchSettings";
import RfpSettings from "../../components/Settings/RfpSettings";
import CallbackSettings from "../../components/Settings/CallbackSettings";


const Index = () => {

  const pageTitle = 'Settings';

  const [reportDate, setReportDate] = useState({
    start: moment().format('M/DD/YYYY'),
    end: moment().format('M/DD/YYYY'),
  });

  const [rowsDispatch,setRowDispatch] = useState([]);
  const [rowsCheck,setRowCheck] = useState([]);
  const [rowsOtd,setRowOtd] = useState([]);
  const [rowsCallback,setRowCallback] = useState([]);
  const [rowsRfpElectrical,setRowRfpElectrical] = useState([]);
  const [rowsRfpRental,setRowRfpRental] = useState([]);

  const [resultData,setResultData] = useState([]);
  
  let tableHeaderColor = 'wheat';
  
  const getDispatchPivotData = async (data) => {

    await axios.post('/api/report_request/getReports',data)
    .then( result => {
      setResultData(result.data);
      console.log(result.data);
    })
    .catch( err => {
      console.log(err)
    });
  }

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
                <Box sx={{m:1 }}>
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="vendor-settings"
                      >
                        <Typography>Vendor Settings</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <VendorSettings />
                      </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="dispatch-settings"
                      >
                        <Typography>Dispatch Activity Settings</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <DispatchSettings />
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="rfp-settings"
                      >
                        <Typography>RFP Settings</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <RfpSettings />
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="callback-settings"
                      >
                        <Typography>Callback Settings</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CallbackSettings />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Box>
              </div>
            </div>
          </div>    
      </div>
    </>
  )
}


export default Index