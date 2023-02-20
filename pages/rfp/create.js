import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';
import uniqid  from 'uniqid';




const Create = () => {

  const router = useRouter();

  const pageTitle = 'Create RFP'

  // let rfp_id = uniqid();
  const [rfp_id,setRfpId] = useState(uniqid.process());

  const [vendorArr,setVendorArr] = useState([]);
  const [skyContactArr,setSkyContactArr] = useState([]);
  const [rfpTypeArr,setRfpTypeArr] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [rfpType, setRfpType] = useState('');
  const [rfpTypeBorder, setRfpTypeBorder] = useState('#ced4da');
  const [rfpTypeError, setRfpTypeError] = useState(rfpType.value===undefined ? 1 : 0);
  const [displayErrorRfp, setDisplayErrorRfp] = useState('none');

  const [displayTab,setDisplayTab] = useState({
    display: 'inline-flex',
    disabled: false
  });

  const [displayField,setDisplayField] = useState('none');
  

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
    start: moment().format('M/DD/YYYY'),
    end: moment().format('M/DD/YYYY'),
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

    console.log(rfp_id);
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

      console.log(rfp_id);
  }

  const onUpload = (e) => {
    // console.log(fileUpload.file);

    const formData = new FormData();

    formData.append('file',fileUpload.file)
    formData.append('rfp_id',rfp_id)

    axios.post(
        '/api/testUpload',
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

        toast.success('File has been uploaded', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark"
        });
        
    })
    .catch(err => {
        // console.log(err)
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
    })
  }
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);


  useEffect(() => {

    console.clear();
    
    const getVendorArr = async () => {

        const result = await axios.get('/api/vendor_request/getVendorNameList');

        setVendorArr(result.data);
    };

    const getRfpTypeArr = async () => {

      const result = await axios.get('/api/rfp_request/getRfpTypeList');

      setRfpTypeArr(result.data);
    };

    getVendorArr();
    getRfpTypeArr();

    return () => {
        setVendorArr([]);
        getRfpTypeArr([]);
    }

  }, []);

  const handleVendorName = (val) => {

    setVendor(val);
    setVendorBorder('#ced4da');
    setVendorError(0);
    setDisplayErrorVendor('none');
    
    if(val===null) {
      setVendor([]);
      setVendorBorder('#f44336');
      setVendorError(1);
      setDisplayErrorVendor('block');
    }  
    // console.log( md5(moment().unix()) )

    console.log(rfp_id);
  }

  const handleRfpType = (val) => {

    setRfpType(val);
    setRfpTypeBorder('#ced4da');
    setRfpTypeError(0);
    setDisplayErrorRfp('none');
    setValueTab(0)
    
    if(val===null) {
      setRfpType([]);
      setRfpTypeBorder('#f44336');
      setRfpTypeError(1);
      setDisplayErrorRfp('block');
    }  

    setDisplayTab({
      display: val.label === 'Electrical' ? 'inline-flex' : 'none',
      disabled: val.label === 'Electrical' ? false : true
    });

    setDisplayField(val.label === 'Electrical' ? 'flex' : 'none');

    setParticularsDisplay(val.label === 'Electrical' ? 'none' : 'block')

    // setParticulars({
    //   value:
    // })

    // const [particulars, setParticulars] = useState({
    //   value: '',
    //   display: false
    // });

    console.log(val)
  }

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
  //

  const submitData = e => {
    
    e.preventDefault();

    setVendorBorder(vendor.value===undefined ? '#f44336' : '#ced4da');
    setVendorError(vendor.value===undefined ? 1 : 0);
    setDisplayErrorVendor(vendor.value===undefined ? 'block' : 'none');

    setRfpTypeBorder(rfpType.value===undefined ? '#f44336' : '#ced4da');
    setRfpTypeError(rfpType.value===undefined ? 1 : 0);
    setDisplayErrorRfp(rfpType.value===undefined ? 'block' : 'none');

    

    const errorCount =  vendorError + rfpTypeError;

      console.log(errorCount);

      if(errorCount === 0){

        setBtnDisabled(true);
        setDisableForm(true);
        
        const url = '/api/rfp_request/createRfp'
        const data = {
            id: rfp_id,
            vendor_id: vendor.value,
            rfp_type_id: rfpType.value,
            internal_order1: internalOrder1,
            internal_order2: internalOrder2,
            particulars: rfpType.value == 1 ? null : particulars,
            bill_period_from: moment(billDate.start).format('YYYY-MM-DD'),
            bill_period_to: moment(billDate.end).format('YYYY-MM-DD'),
            bill_month: moment(billDate.start).format('MMM-YYYY'),
            bill_date_received: moment(billReceiveDate).format('YYYY-MM-DD'),
            due_date: moment(dueDate).format('YYYY-MM-DD'),
            rfp_date: moment(rfpDate).format('YYYY-MM-DD'),
            next_bill_date: moment(nextBillDate).format('YYYY-MM-DD'),
            current_reading: rfpType.value == 1 ? currentReading : 0,
            prev_reading: rfpType.value == 1 ? prevReading : 0,
            consumption: rfpType.value == 1 ? consumption : 0,
            rate: rfpType.value == 1 ? rate : 0,
            amount: rfpType.value == 1 ? amount : 0,
            vat_amount: rfpType.value == 1 ? vatAmount : 0,
            interest: rfpType.value == 1 ? interest : 0,
            penalty: rfpType.value == 1 ? penalty : 0,
            penalty_over_interest: rfpType.value == 1 ? penaltyOverInterest : 0,
            surcharge: rfpType.value == 1 ? surcharge: 0,
            misc: rfpType.value == 1 ? misc : 0,
            total_amount: rfpType.value == 1 ? totalAmount : 0
        }
        
        // console.log(data)
        const notifId = toast.loading("Please wait...");
        
        axios.post(url, data)
        .then( res => {
          // resolve(res);
          setTimeout(() => {
            toast.update(notifId, {
              render: "New RFP has been created", 
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
  }

  return (
    <>
      <Head>
        <title>Coreserv</title>
      </Head>
      <div id="main_content">
        <Sidemenu></Sidemenu>
        
        <div className="page">
          <div id="page_top" className="section-body">
            <div className="container-fluid">
              <div className="page-header">
                <Topmenu></Topmenu>
              </div>
            </div>
          </div>
          <div className="section-body">
            <div className="container-fluid">
              <h4>{pageTitle}</h4>
              <form onSubmit={submitData}>
                <div className="card">
                  <div className="card-body">
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={7}>
                        <Select 
                          value={vendor}
                          options={vendorArr} 
                          onChange={handleVendorName}
                          isClearable={true}
                          placeholder="Select Vendor"
                          isDisabled={disableForm}
                          styles={{
                            control:(baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: vendorBorder,
                            }),
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          display={displayErrorVendor} 
                          gutterBottom 
                          sx={{ color: '#f44336' }}
                        >
                            Enter Vendor Name
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        <Select 
                          value={rfpType}
                          options={rfpTypeArr} 
                          onChange={handleRfpType}
                          isClearable={true}
                          placeholder="Select RFP Type"
                          isDisabled={disableForm}
                          styles={{
                            control:(baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: rfpTypeBorder,
                            }),
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          display={displayErrorRfp} 
                          gutterBottom 
                          sx={{ color: '#f44336' }}
                        >
                            Enter RFP Type
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={2}>
                        <Stack spacing={2} direction="row">
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="primary" 
                            type="submit"
                            disabled={btnDisabled}
                          >Save</Button>
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/rfp')}
                          >Cancel</Button>
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
                                  secondary="Vendor Code"
                                  primary= { vendor!==null ? vendor.vendor_code : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Tin Num" 
                                  primary= { vendor!==null ? vendor.tin_num : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Address" 
                                  primary= { vendor!==null ? vendor.address : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Building Name" 
                                  primary= { vendor!==null ? vendor.bldg_name : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="City" 
                                  primary= { vendor!==null ? vendor.city : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Contact Person" 
                                  primary= { vendor!==null ? vendor.sky_contact_person : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Contact Number" 
                                  primary= { vendor!==null ? vendor.sky_contact_number : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="Sky Email Address" 
                                  primary= { vendor!==null ? vendor.sky_email_add : '' } 
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  secondary="KAM" 
                                  primary= { vendor!==null ? vendor.kam : '' } 
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
                                  onChange={ e => setInternalOrder1(e.target.value) }
                                  disabled={disableForm}
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
                                  onChange={ e => setInternalOrder2(e.target.value) }
                                  disabled={disableForm}
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
                      <div // DATES
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
                      <div // UPLOAD
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
                                  <Button variant='text'><input type="file" name="file_upload" onChange={onFileChange} accept=".pdf,.jpg"  /></Button>
                                  <Button onClick={onUpload} disabled={uploadBtnDisabled} >Upload</Button>
                                </ButtonGroup>
                              </FormControl>
                            </ListItem>
                          </List>
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