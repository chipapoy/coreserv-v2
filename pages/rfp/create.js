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
import {
  List,ListItem,ListItemText,Divider,Grid,
  Button,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';




const Create = () => {

  const router = useRouter();

  const pageTitle = 'Create RFP'

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
      Today: [moment().toDate(), moment().toDate()],
      Yesterday: [
        moment().subtract(1, 'days').toDate(),
        moment().subtract(1, 'days').toDate(),
      ],
      'Last 7 Days': [
        moment().subtract(6, 'days').toDate(),
        moment().toDate(),
      ],
      'Last 30 Days': [
        moment().subtract(29, 'days').toDate(),
        moment().toDate(),
      ],
      'This Month': [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ],
      'Last Month': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate(),
      ],
      'This Year': [
        moment().startOf('year').toDate(),
        moment().toDate(), moment().toDate(),
      ],
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
  }

  const [nextBillDate, setNextBillDate] = useState(moment().format('M/DD/YYYY'));

  // const handleNextBillDate = (date, label) => {
  //   // date = moment(date).format('M/DD/YYYY');
  //   setNextBillDate(date)
  // }
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);



  useEffect(() => {
    
    const getVendorArr = async () => {

        const result = await axios.get('/api/getVendorNameList');

        setVendorArr(result.data);
    };

    const getRfpTypeArr = async () => {

      const result = await axios.get('/api/getRfpTypeList');

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
    console.log(val)
  }

  const handleRfpType = (val) => {

    setRfpType(val);
    setRfpTypeBorder('#ced4da');
    setRfpTypeError(0);
    setDisplayErrorRfp('none');
    
    if(val===null) {
      setRfpType([]);
      setRfpTypeBorder('#f44336');
      setRfpTypeError(1);
      setDisplayErrorRfp('block');
  }  
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

  const submitData = async (event) => {
    
      event.preventDefault();

      // setSubmitBtn('Processing');
      // setBtnDisabled(true);

      console.log("Vendor " + vendor.value);
      console.log("Vendor Error " + vendorError);
      console.log("RFP " + rfpType.value);
      console.log("RFP Error " + rfpTypeError);
      console.log("Billing Date " + billDate);
      console.log("Current Reading " + currentReading);

      setVendorBorder(vendor.value===undefined ? '#f44336' : '#ced4da');
      setVendorError(vendor.value===undefined ? 1 : 0);
      setDisplayErrorVendor(vendor.value===undefined ? 'block' : 'none');

      setRfpTypeBorder(rfpType.value===undefined ? '#f44336' : '#ced4da');
      setRfpTypeError(rfpType.value===undefined ? 1 : 0);
      setDisplayErrorRfp(rfpType.value===undefined ? 'block' : 'none');


      const errorCount = await vendorError + rfpTypeError;

      console.log(errorCount);

      if(errorCount === 0){
        const data = {
            vendor_id: vendor.value,
            rfp_type_id: rfpType.value
        }
        
        console.log(data)

        // const url = '/api/createRfp'

        // await axios.post(url, data)
        // .then( res => {

        //     // console.log(res);

        //     if(res.status === 200){

        //         toast.success('New RFP has been created', {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             pauseOnFocusLoss: false,
        //             draggable: false,
        //             progress: undefined,
        //             theme: "dark"
        //         })
                
        //         toast.onChange(v => {
        //             if(v.status === "removed"){
        //                 router.push("/rfp")
        //             }
        //         });
        //     }  
        //     else{

        //         setSubmitBtn('Submit');
        //         setBtnDisabled(false);

        //         toast.error('Unable to connect to server. Please try again.', {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             pauseOnFocusLoss: false,
        //             draggable: false,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //     }

        // })
        // .catch(err => {

        //     setSubmitBtn('Submit');
        //     setBtnDisabled(false);

        //     // console.log(err)

        //     toast.error(err.message, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         pauseOnFocusLoss: false,
        //         draggable: false,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        // })
        
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
                        <Button 
                          disableElevation
                          variant="contained" 
                          color="primary" 
                          type="submit"
                        >Save</Button>
                        <Button 
                          disableElevation
                          variant="contained" 
                          color="error" 
                          onClick={()=>router.push('/rfp')}
                        >Cancel</Button>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valueTab} onChange={handleChange} aria-label="">
                          <Tab label="Details" {...a11yProps(0)} />
                          <Tab label="Dates" sx={{display:'inline-flex'}} {...a11yProps(1)} />
                          <Tab label="Rates" {...a11yProps(2)} />
                          <Tab label="Upload" {...a11yProps(3)} />
                        </Tabs>
                      </Box>
                      <div
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
                      <div
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
                              <DateRangePicker
                                initialSettings={dateRangePickerOptions}
                                onCallback={handleBillDate}
                              >
                                <TextField 
                                  label="Billing Date" 
                                  variant="standard" 
                                  value={billDate.start + ' - ' + billDate.end}
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
                                />
                              </FormControl>
                            </ListItem>
                            
                          </List>
                        </nav>
                      </div>
                      <div
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
                                <TextField
                                  label="Current Reading" 
                                  variant="standard" 
                                  type='number'
                                  value={currentReading}
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
                                  onChange={ e => {
                                    setRate(parseFloat(e.target.value)) 
                                    setAmount(consumption * parseFloat(e.target.value))
                                  }}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Amount" 
                                  variant="standard" 
                                  type='number'
                                  value={amount}
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
                                  onChange={ e => setVatAmount(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Interest" 
                                  variant="standard" 
                                  type='number'
                                  value={interest}
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
                                  onChange={ e => setPenalty(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Penalty/Interest Vat Amount" 
                                  variant="standard" 
                                  type='number'
                                  value={penaltyOverInterest}
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
                                  onChange={ e => setSurcharge(parseFloat(e.target.value)) }
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                  }}
                                />
                              </FormControl>
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                  label="Miscellaneous" 
                                  variant="standard" 
                                  type='number'
                                  value={misc}
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
                      <div
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
                              <FormControl sx={{ m: 1 }} variant="standard">
                                <Button variant="contained" component="label">
                                  Upload
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
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