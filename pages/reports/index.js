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

const Index = () => {

  const pageTitle = 'Report';

  const [reportDate, setReportDate] = useState({
    start: moment().format('M/DD/YYYY'),
    end: moment().format('M/DD/YYYY'),
  });

  const [rowsDispatch,setRowDispatch] = useState([]);
  const [rowsCheck,setRowCheck] = useState([]);
  const [rowsOtd,setRowOtd] = useState([]);

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

  function createData(name, values) {
    return { name, values };
  }
  
  const getDispatchPivotData = async (data) => {

    await axios.post('/api/report_request/getReports',data)
    .then( result => {
      setRowDispatch(result.data.dispatchPivot);
      setRowCheck(result.data.checkPivot);
      setRowOtd(result.data.otdPivot)

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
                <Grid container spacing={2}>
                  <Grid item xs={2} lg={2}>
                    <FormControl  sx={{ m: 1 }} variant="standard">
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
                      
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Button 
                      disableElevation
                      variant="outlined" 
                      color="primary" 
                      type="submit"
                      children="Submit"
                      onClick={submitData}
                    />
                  </Grid>
                </Grid>
                
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
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
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
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
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
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
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>    
      </div>
    </>
  )
}


export default Index