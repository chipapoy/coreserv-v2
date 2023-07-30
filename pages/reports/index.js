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
import ExportDispatch from "../../components/Report/ExportDispatch";
import ExportCheck from "../../components/Report/ExportCheck";
import ExportOtd from "../../components/Report/ExportOtd";
import ExportCallback from "../../components/Report/ExportCallback";
import ExportRfp from "../../components/Report/ExportRfp";

const Index = () => {

  const pageTitle = 'Report';

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

  const [disableForm,setDisableForm] = useState(false);

  const dateRangePickerOptions = {
    ranges: {
      'This Month': [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ],
      'Last Month': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate(),
      ]
    }
  }

  const handleReportDate = (start, end, label) => {
    // console.log(moment(start).format('YYYY-MM-DD'));
    start = moment(start).format('M/DD/YYYY');
    end = moment(end).format('M/DD/YYYY');
    setReportDate({ start, end })

    console.log(start + ' ' + end);
  }
  
  const getDispatchPivotData = async (data) => {

    await axios.post('/api/report_request/getReports',data)
    .then( result => {
      setRowDispatch(result.data.dispatchPivot);
      setRowCheck(result.data.checkPivot);
      setRowOtd(result.data.otdPivot);
      setRowCallback(result.data.callbackPivot);
      setRowRfpElectrical(result.data.rfpElectricalPivot);
      setRowRfpRental(result.data.rfpRentalPivot);

      setResultData(result.data);
      console.log(result.data);
    })
    .catch( err => {
      console.log(err)
    });
  }

  const submitData = (e) => {
    e.preventDefault();
    const data = {
      start: moment(reportDate.start).format('YYYY-MM-DD'),
      end:  moment(reportDate.end).format('YYYY-MM-DD')
    }

    getDispatchPivotData(data);

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
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
                      <Paper elevation={1} sx={{p:2}} >
                          <DateRangePicker
                            initialSettings={dateRangePickerOptions}
                            onCallback={handleReportDate}
                          >
                            <TextField 
                              label="Select Report Date" 
                              variant="standard" 
                              value={reportDate.start + ' - ' + reportDate.end}
                              disabled={disableForm}
                            />
                          </DateRangePicker>
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="primary" 
                            type="submit"
                            onClick={submitData}
                          >Submit</Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{m:1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} lg={6}>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                              <TableHead sx={{ backgroundColor: tableHeaderColor }}>
                                <TableRow>
                                  <TableCell>Pivot Dispatch</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsDispatch.map((row) => (
                                  <TableRow
                                    key={row.status}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.status}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell >
                                    <ExportDispatch
                                      data={resultData.dispatchRaw}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid><br/>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead  sx={{ backgroundColor: tableHeaderColor }} >
                                <TableRow>
                                  <TableCell>Pivot Check</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsCheck.map((row) => (
                                  <TableRow
                                    key={row.remarks}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.remarks}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <ExportCheck
                                      data={resultData.checkRaw}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid><br/>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead  sx={{ backgroundColor: tableHeaderColor }} >
                                <TableRow>
                                  <TableCell>Pivot OTD</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsOtd.map((row) => (
                                  <TableRow
                                    key={row.concern}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.concern}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <ExportOtd
                                      data={resultData.otdRaw}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid><br/>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead  sx={{ backgroundColor: tableHeaderColor }} >
                                <TableRow>
                                  <TableCell>Pivot Callback</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsCallback.map((row) => (
                                  <TableRow
                                    key={row.status}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.status}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <ExportCallback
                                      data={resultData.callbackRaw}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} lg={6}>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead  sx={{ backgroundColor: tableHeaderColor }} >
                                <TableRow>
                                  <TableCell>Pivot RFP Electrical</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsRfpElectrical.map((row) => (
                                  <TableRow
                                    key={row.vendor_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.vendor_name}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <ExportRfp
                                      data={resultData.rfpElectricalRaw}
                                      rfpType="Electrical"
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid><br/>
                      <Grid item xs={12} lg={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead  sx={{ backgroundColor: tableHeaderColor }} >
                                <TableRow>
                                  <TableCell>Pivot RFP Rental</TableCell>
                                  <TableCell align="right">{moment(reportDate.start).format('D-MMM-YY') +' to '+ moment(reportDate.end).format('D-MMM-YY')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsRfpRental.map((row) => (
                                  <TableRow
                                    key={row.vendor_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">{row.vendor_name}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <ExportRfp
                                      data={resultData.rfpRentalRaw}
                                      rfpType="Rental"
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </div>    
      </div>
    </>
  )
}


export default Index