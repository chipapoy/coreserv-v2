import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../../components/Layouts/Topmenu";
import Sidemenu from "../../../components/Layouts/Sidemenu";
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment,ListItemIcon,IconButton
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Viewfile from "../../../components/Rfp/Viewfile";




const Create = () => {

  const router = useRouter();

  const { rfpId } = router.query;

  const pageTitle = 'Update RFP';

  const [rfpData,setRfpData] = useState([]);
  const [rfpType,setRfpType] = useState('');

  const [rfpUploads,setRfpUpload] = useState([]);

  const [internalOrder1, setInternalOrder1] = useState('');
  const [internalOrder2, setInternalOrder2] = useState('');
  const [particulars, setParticulars] = useState('');
  const [particularsDisplay, setParticularsDisplay] = useState('none');

  const [currentReading,setCurrentReading] = useState(0);
  const [prevReading,setPrevReading] = useState(0);
  const [consumption,setConsumption] = useState(currentReading - prevReading);

  const [rate,setRate] = useState(0);
  const [amount,setAmount] = useState(0);
  const [vatAmount,setVatAmount] = useState(0);
  const [interest,setInterest] = useState(0);
  const [penalty,setPenalty] = useState(0);
  const [penaltyOverInterest,setPenaltyOverInterest] = useState(0);
  const [surcharge,setSurcharge] = useState(0);
  const [misc,setMisc] = useState(0);
  const totalAmount = amount+vatAmount+interest+penalty+penaltyOverInterest+surcharge+misc;

  const [displayTab,setDisplayTab] = useState({
    display: 'inline-flex',
    disabled: false
  });

  const getRfpUpload = async (rfpId) => {

    console.log('called from function');

    await axios.post('/api/rfp_request/getRfpUpload',{
      rfp_id : rfpId
    })
    .then( (result) => {
      setRfpUpload(result.data);
    })
    .catch( (err) => {
      console.log(err);
      setRfpUpload([]);
    });

    
    
  };

  const getRfpDetails = async (rfpId) => {

    await axios.post('/api/rfp_request/getRfpDetails',{
      id : rfpId
    })
    .then( (result) => {

      setBillDate({
        start: moment(result.data.bill_period_from).format('M/DD/YYYY'),
        end: moment(result.data.bill_period_to).format('M/DD/YYYY')
      });
      
      setRfpData(result.data);

      setRfpType(result.data.rfp_type);
      setBillReceiveDate(moment(result.data.date_bill_received).format('M/DD/YYYY'));
      setDueDate(moment(result.data.due_date).format('M/DD/YYYY'));
      setRfpDate(moment(result.data.rfp_date).format('M/DD/YYYY'));
      setNextBillDate(moment(result.data.bill_period_to).add(1,'days').format('M/DD/YYYY'));
      
      setInternalOrder1(result.data.internal_order1);
      setInternalOrder2(result.data.internal_order2);
      setCurrentReading(result.data.current_reading);
      setPrevReading(result.data.previous_reading);
      setRate(result.data.rate);
      setVatAmount(result.data.vat_amount);
      setInterest(result.data.interest);
      setPenalty(result.data.penalty);
      setPenaltyOverInterest(result.data.penalty_over_interest_vat_amount);
      setSurcharge(result.data.surcharge);
      setMisc(result.data.miscellaneuos);
      setConsumption(result.data.current_reading - result.data.previous_reading);
      setAmount((result.data.current_reading - result.data.previous_reading) * result.data.rate);

      setParticulars(result.data.particulars);

      setParticularsDisplay(result.data.rfp_type === 'Electrical' ? 'none' : 'block');

      setDisplayTab({
        display: result.data.rfp_type === 'Electrical' ? 'inline-flex' : 'none',
        disabled: result.data.rfp_type === 'Electrical' ? false : true
      });
    })
    .catch( (err) => {
      console.log(err);
    });
  };

  useEffect(() => {

    getRfpDetails(rfpId);
    getRfpUpload(rfpId);

    return () => {
        // getRfpDetails([]);
        setRfpUpload([]);
    }

  }, [rfpId]);


  const handleCurrentReading = (e) => {
    setCurrentReading(e.target.value)
    console.log(currentReading);
  }

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

  const [billDate, setBillDate] = useState({
    start: moment().startOf('month').format('M/DD/YYYY'), //moment().format('M/DD/YYYY'),
    end: moment().endOf('month').format('M/DD/YYYY') //moment().format('M/DD/YYYY'),
  });

  const handleBillDate = (start, end, label) => {
    // console.log(moment(start).format('YYYY-MM-DD'));
    start = moment(start).format('M/DD/YYYY');
    end = moment(end).format('M/DD/YYYY');

    setNextBillDate(moment(end).add(1,'days').format('M/DD/YYYY'))

    setBillDate({ start, end })

    console.log(start + ' ' + end);
  }

  const [billReceiveDate, setBillReceiveDate] = useState(moment().format('M/DD/YYYY'));

  const handleBillReceiveDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setBillReceiveDate(date)
  }

  const [dueDate, setDueDate] = useState(moment().format('M/DD/YYYY'));

  const handleDueDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setDueDate(date)
  }

  const [rfpDate, setRfpDate] = useState(moment().format('M/DD/YYYY'));

  const handleRfpDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setRfpDate(date)

    console.log(rfpId);
  }

  const [nextBillDate, setNextBillDate] = useState(moment().format('M/DD/YYYY'));
  
  const [fileUpload,setFileUpload] = useState([]);
  const [uploadBtnDisabled,setUploadBtnDisabled] = useState(true);

  const onFileChange = (e) => {

      const fileSize = e.target.files[0].size / (1024 * 1024);
      console.log(fileSize);
      
      setFileUpload({
          file: e.target.files[0]
      });

      setUploadBtnDisabled(false);

      console.log(rfpId);
  }

  const onUpload = e => {
    // console.log(fileUpload.file);
    e.preventDefault();


    const formData = new FormData();

    formData.append('file',fileUpload.file);
    formData.append('ref_id',rfpId);
    formData.append('rec_type','rfp');
    formData.append('user',sessionStorage.name);

    const uploadId = toast.loading("Uploading...");

    console.log(formData)

    axios.post(
        '/api/rfp_request/uploadFileRfp',
        formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    )
    .then(res => {
        console.log(e)
        e.target.value = "";
        setUploadBtnDisabled(true);

        setTimeout(() => {
          toast.update(uploadId, {
            render: "File has been uploaded", 
            type: 'success',
            isLoading: false,
            delay:undefined,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              // router.push("/rfp");
              getRfpUpload(rfpId);
            }
          });
        }, 2000);
    })
    .catch(err => {
        // console.log(err)
        setTimeout(() => {
          toast.update(uploadId, {
            render: "Something went wrong. Please try again. " + err.response.data.error, 
            type: 'error',
            isLoading: false,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              // setBtnDisabled(false);
              // setDisableForm(false);
              getRfpUpload(rfpId);
            }
          });
        }, 2000);
    })
  }
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  // TAB PANEL
    const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const [valueTab, setValueTab] = useState(0);

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

  // VIEW FILES

    const [viewSoa,setViewSoa] = useState(false);

    const viewSoaCallback = (data) => {
      setViewSoa({
        open:data.open,
        cancel:data.cancel,
        data: null
      });
    }

    const viewFile = data => {
      // e.preventDefault();
      setViewSoa({
        open: true,
        cancel: false,
        data: data
      });
      
      // const props = {
      //   data: data,
      //   open: true
      // }

      // console.log(props);


      // return <Viewfile {...props} />
    }

  const submitData = e => {

    e.preventDefault();

    setBtnDisabled(true);
    setDisableForm(true);

    const url = '/api/rfp_request/updateRfp'
    const data = {
      id: rfpId,
      internal_order1: internalOrder1,
      internal_order2: internalOrder2,
      particulars: rfpType == 'Electrical' ? null : particulars,
      bill_period_from: moment(billDate.start).format('YYYY-MM-DD'),
      bill_period_to: moment(billDate.end).format('YYYY-MM-DD'),
      bill_month: moment(billDate.start).format('MMM-YYYY'),
      bill_date_received: moment(billReceiveDate).format('YYYY-MM-DD'),
      due_date: moment(dueDate).format('YYYY-MM-DD'),
      rfp_date: moment(rfpDate).format('YYYY-MM-DD'),
      current_reading: rfpType == 'Electrical' ? currentReading : 0,
      prev_reading: rfpType == 'Electrical' ? prevReading : 0,
      consumption: rfpType == 'Electrical' ? consumption : 0,
      rate: rfpType == 'Electrical' ? rate : 0,
      amount: rfpType == 'Electrical' ? amount : 0,
      vat_amount: rfpType == 'Electrical' ? vatAmount : 0,
      interest: rfpType == 'Electrical' ? interest : 0,
      penalty: rfpType == 'Electrical' ? penalty : 0,
      penalty_over_interest: rfpType == 'Electrical' ? penaltyOverInterest : 0,
      surcharge: rfpType == 'Electrical' ? surcharge : 0,
      misc: rfpType == 'Electrical' ? misc : 0,
      total_amount: rfpType == 'Electrical' ? totalAmount: 0,
      user: sessionStorage.name,
      update_date:  moment().format('YYYY-MM-DD HH:mm')
    }

    const notifId = toast.loading("Please wait...");

    axios.post(url, data)
    .then( res => {
      setTimeout(() => {
        toast.update(notifId, {
          render: "Record has been updated", 
          type: 'success',
          isLoading: false,
          delay:undefined,
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            router.push("/rfp");
          }
        });
      }, 2000);
    })
    .catch(err => {

      setTimeout(() => {
        toast.update(notifId, {
          render: "Something went wrong. Please try again.", 
          type: 'error',
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            setBtnDisabled(false);
            setDisableForm(false);
          }
        });
      }, 2000);
    });
  }

  return (
    <>
      <Head>
        <title>Coreserv</title>
      </Head>
      <div id="main_content">
        <Sidemenu />
        
        <div className="page">
          <Topmenu />
          <div className="section-body">
            <div className="container-fluid">
              <h4>{pageTitle}</h4>
              <form onSubmit={submitData}>
                <div className="card">
                  <div className="card-body">
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={2}>
                        <Stack spacing={2} direction="row">
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="primary" 
                            type="submit"
                            // onClick={submitData}
                            children="Update"
                          />
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            onClick={()=>router.push('/rfp')}
                            children="Cancel"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valueTab} onChange={handleChange} aria-label="">
                          <Tab label="Details" {...a11yProps(0)} />
                          <Tab label="Internal Orders" {...a11yProps(1)} />
                          <Tab label="Dates" {...a11yProps(2)} />
                          <Tab label="Rates" sx={{display:displayTab.display}} {...a11yProps(3)} />
                          <Tab label="Upload" {...a11yProps(4)} />
                        </Tabs>
                      </Box>
                      <div // VENDOR DETAILS
                        index={0}
                        role="tabpanel"
                        hidden={valueTab !== 0}
                        id={`simple-tabpanel-0`}
                        aria-labelledby={`simple-tab-0`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Vendor Name"
                                  primary= { rfpData!==null ? rfpData.vendor_name : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="RFP Type"
                                  primary= { rfpData!==null ? rfpData.rfp_type : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Vendor Code"
                                  primary= { rfpData!==null ? rfpData.vendor_code : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Tin Num" 
                                  primary= { rfpData!==null ? rfpData.tin_num : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Address" 
                                  primary= { rfpData!==null ? rfpData.address : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Building Name" 
                                  primary= { rfpData!==null ? rfpData.bldg_name : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="City" 
                                  primary= { rfpData!==null ? rfpData.city : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Contact Person" 
                                  primary= { rfpData!==null ? rfpData.contact_person : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Contact Number" 
                                  primary= { rfpData!==null ? rfpData.contact_number : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Email Address" 
                                  primary= { rfpData!==null ? rfpData.email_add : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="KAM" 
                                  primary= { rfpData!==null ? rfpData.kam : '' } 
                              />
                            </ListItem>
                          </List>
                        </nav>
                      </div>
                      <div // INTERNAL ORDERS
                        index={1}
                        role="tabpanel"
                        hidden={valueTab !== 1}
                        id={`simple-tabpanel-1`}
                        aria-labelledby={`simple-tab-1`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField 
                                  label="Order 1" 
                                  variant="standard" 
                                  multiline
                                  maxRows={4}
                                  value={internalOrder1}
                                  disabled={disableForm}
                                  onChange={ e => setInternalOrder1(e.target.value) }
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField 
                                  label="Order 2" 
                                  variant="standard" 
                                  multiline
                                  maxRows={4}
                                  value={internalOrder2}
                                  disabled={disableForm}
                                  onChange={ e => setInternalOrder2(e.target.value) }
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start" sx={{display:particularsDisplay}}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField 
                                  label="Particulars" 
                                  variant="standard" 
                                  multiline
                                  maxRows={4}
                                  value={particulars}
                                  onChange={ e => setParticulars(e.target.value) }
                                  disabled={disableForm}
                                />
                              </FormControl>
                            </ListItem>
                          </List>
                        </nav>
                      </div>
                      <div //DATES
                        index={2}
                        role="tabpanel"
                        hidden={valueTab !== 2}
                        id={`simple-tabpanel-2`}
                        aria-labelledby={`simple-tab-2`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                              <DateRangePicker
                                initialSettings={dateRangePickerOptions}
                                onCallback={handleBillDate}
                              >
                                <TextField 
                                  label="Billing Date" 
                                  variant="standard" 
                                  value={billDate.start + ' - ' + billDate.end}
                                  disabled={disableForm}
                                />
                              </DateRangePicker>
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField 
                                  label="Month" 
                                  variant="standard" 
                                  aria-readonly={true}
                                  value={ moment(billDate.start).format('MMM-YYYY') }
                                  disabled={disableForm}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                              <DateRangePicker
                                initialSettings={{
                                  singleDatePicker: true,
                                  autoApply: true
                                }}
                                onCallback={handleBillReceiveDate}
                              >
                                <TextField 
                                  label="Date Bill Received" 
                                  variant="standard" 
                                  value={billReceiveDate}
                                  disabled={disableForm}
                                />
                              </DateRangePicker>
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                              <DateRangePicker
                                initialSettings={{
                                  singleDatePicker: true,
                                  autoApply: true
                                }}
                                onCallback={handleDueDate}
                              >
                                <TextField 
                                  label="Due Date" 
                                  variant="standard" 
                                  value={dueDate}
                                  disabled={disableForm}
                                />
                              </DateRangePicker>
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                              <DateRangePicker
                                initialSettings={{
                                  singleDatePicker: true,
                                  autoApply: true
                                }}
                                onCallback={handleRfpDate}
                              >
                                <TextField 
                                  label="RFP Date" 
                                  variant="standard" 
                                  value={rfpDate}
                                  disabled={disableForm}
                                />
                              </DateRangePicker>
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField 
                                  label="Next Bill Date" 
                                  variant="standard" 
                                  aria-readonly={true}
                                  value={nextBillDate}
                                  disabled={disableForm}
                                />
                              </FormControl>
                            </ListItem>
                            
                          </List>
                        </nav>
                      </div>
                      <div // RATES
                        index={3}
                        role="tabpanel"
                        hidden={valueTab !== 3}
                        id={`simple-tabpanel-3`}
                        aria-labelledby={`simple-tab-3`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                          <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Current Reading" 
                                  variant="standard" 
                                  type='number'
                                  value={currentReading}
                                  disabled={disableForm}
                                  onChange={ e => {
                                    setCurrentReading(e.target.value)
                                    setConsumption(e.target.value - prevReading)
                                    setAmount((e.target.value - prevReading) * rate)
                                  }}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">KwH</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Previous Reading" 
                                  variant="standard" 
                                  type='number'
                                  value={prevReading}
                                  disabled={disableForm}
                                  onChange={ e => {
                                    setPrevReading(e.target.value) 
                                    setConsumption(currentReading - e.target.value)
                                    setAmount((currentReading - e.target.value) * rate)
                                  }}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">KwH</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Consumption" 
                                  variant="standard" 
                                  type='number'
                                  aria-readonly={true}
                                  value={currentReading - prevReading}
                                  disabled={disableForm}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">KwH</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Rate" 
                                  variant="standard" 
                                  type='number'
                                  value={rate}
                                  disabled={disableForm}
                                  onChange={ e => {
                                    setRate(parseFloat(e.target.value)) 
                                    setAmount(consumption * parseFloat(e.target.value))
                                  }}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Amount" 
                                  variant="standard" 
                                  type='number'
                                  value={amount}
                                  disabled={disableForm}
                                  // onChange={ e => setAmount(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Vat Amount" 
                                  variant="standard" 
                                  type='number'
                                  value={vatAmount}
                                  disabled={disableForm}
                                  onChange={ e => setVatAmount(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Interest" 
                                  variant="standard" 
                                  type='number'
                                  value={interest}
                                  disabled={disableForm}
                                  onChange={ e => setInterest(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Penalty" 
                                  variant="standard" 
                                  type='number'
                                  value={penalty}
                                  disabled={disableForm}
                                  onChange={ e => setPenalty(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Penalty/Interest Vat Amount" 
                                  variant="standard" 
                                  type='number'
                                  value={penaltyOverInterest}
                                  disabled={disableForm}
                                  onChange={ e => setPenaltyOverInterest(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                          </List>
                          <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Surcharge" 
                                  variant="standard" 
                                  type='number'
                                  value={surcharge}
                                  disabled={disableForm}
                                  onChange={ e => setSurcharge(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Miscellaneous" 
                                  variant="standard" 
                                  type='number'
                                  value={misc}
                                  disabled={disableForm}
                                  onChange={ e => setMisc(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <Typography variant="h4" gutterBottom>
                                Total Amount: {totalAmount}
                              </Typography>
                            </ListItem>
                        </nav>
                      </div>
                      <div // FILE UPLOAD
                        index={4}
                        role="tabpanel"
                        hidden={valueTab !== 4}
                        id={`simple-tabpanel-4`}
                        aria-labelledby={`simple-tab-4`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl sx={{ m: 1 }} variant="standard">
                                <ButtonGroup variant="outlined" aria-label="outlined primary button group" disableElevation>
                                  <Button variant='text' children={<input type="file" name="file_upload" onChange={onFileChange} accept=".pdf,.jpg"  />} />
                                  <Button onClick={onUpload} disabled={uploadBtnDisabled} children="Upload" />
                                </ButtonGroup>
                              </FormControl>
                            </ListItem>
                          </List>
                          <Grid item xs={4} md={4} lg={4}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Action</TableCell>
                                  <TableCell>File Name</TableCell>
                                  <TableCell>Upload by</TableCell>
                                  <TableCell>Date</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rfpUploads.map((row) => (
                                  <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell>
                                      <Tooltip title="View File">
                                        <IconButton onClick={ () => viewFile(row) }>
                                          <PreviewIcon  />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {row.original_name}
                                    </TableCell>
                                    <TableCell>{row.upload_by}</TableCell>
                                    <TableCell>{row.upload_date}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Viewfile 
                            data={viewSoa.data}
                            open={viewSoa.open} 
                            pageTitle="View SOA" 
                            viewSoaCallback={viewSoaCallback} 
                          />
                          </Grid>
                        </nav>
                      </div>
                    </Box>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>    
      </div>
    </>
  )
}


export default Create