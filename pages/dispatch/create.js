import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  Grid,Stack,Button,Typography,TextField,FormControl
} from '@mui/material';
import { NumericFormat } from 'react-number-format';




const Create = () => {

  const router = useRouter();

  const pageTitle = 'New Dispatch';

  const [vendorArr,setVendorArr] = useState([]);
  const [rfpTypeArr,setRfpTypeArr] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [checkDate, setCheckDate] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [refNumber, setRefNum] = useState('');
  const [checkAmount, setCheckAmount] = useState('');
  const [orNumber, setOrNumber] = useState('');
  const [orDate, setOrDate] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');

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

  const handleCheckDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setCheckDate(date);
  }

  const handleOrDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setOrDate(date);
  }

  const handlePickUpDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setPickUpDate(date);
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

    getVendorArr();

    return () => {
        setVendorArr([]);
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
  }

  const submitData = e => {
    
    e.preventDefault();

    setVendorBorder(vendor.value===undefined ? '#f44336' : '#ced4da');
    setVendorError(vendor.value===undefined ? 1 : 0);
    setDisplayErrorVendor(vendor.value===undefined ? 'block' : 'none');

    const errorCount =  vendorError;

      console.log(errorCount);

      if(errorCount === 0){

        setBtnDisabled(true);
        setDisableForm(true);
        
        const url = '/api/dispatch_request/createDispatch'
        const data = {
          vendor_id: vendor.value,
          check_num: checkNumber,
          check_date: moment(checkDate).format('YYYY-MM-DD'),
          amount: checkAmount,
          ref_number: refNumber,
          or_number: orNumber,
          or_date: moment(orDate).format('YYYY-MM-DD'),
          pickup_date: moment(pickUpDate).format('YYYY-MM-DD')
        }
        
        // console.log(data)
        const notifId = toast.loading("Please wait...");
        
        axios.post(url, data)
        .then( res => {
          // resolve(res);
          setTimeout(() => {
            toast.update(notifId, {
              render: "New Dispatch has been created", 
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
                router.push("/dispatch");
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
                      <Grid item xs={12} lg={12}>
                        <Stack spacing={2} direction="row">
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="primary" 
                            type="submit"
                            disabled={btnDisabled}
                            children="Save"
                          />
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/dispatch')}
                            children="Cancel"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={12}>
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
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="Check Number" 
                            variant="standard" 
                            type='number'
                            value={checkNumber}
                            disabled={disableForm}
                            required
                            onChange={ e => {
                              setCheckNumber(parseInt(e.target.value)) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              autoApply: true
                            }}
                            onCallback={handleCheckDate}
                          >
                            <TextField 
                              label="Check Date" 
                              variant="standard" 
                              value={checkDate}
                              disabled={disableForm}
                              required
                            />
                          </DateRangePicker>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="Amount" 
                            variant="standard" 
                            type='number'
                            inputProps={{step: "0.1", lang:"en-US"}}
                            value={checkAmount}
                            disabled={disableForm}
                            required
                            onChange={ e => {
                              setCheckAmount(parseFloat(e.target.value)) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="Reference Number" 
                            variant="standard" 
                            type='number'
                            value={refNumber}
                            disabled={disableForm}
                            required
                            onChange={ e => {
                              setRefNum(parseInt(e.target.value)) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="OR Number" 
                            variant="standard" 
                            type='number'
                            value={orNumber}
                            disabled={disableForm}
                            required
                            onChange={ e => {
                              setOrNumber(parseInt(e.target.value)) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              autoApply: true
                            }}
                            onCallback={handleOrDate}
                          >
                            <TextField 
                              label="OR Date" 
                              variant="standard" 
                              value={orDate}
                              disabled={disableForm}
                              required
                            />
                          </DateRangePicker>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              autoApply: true
                            }}
                            onCallback={handlePickUpDate}
                          >
                            <TextField 
                              label="Pick-up Date" 
                              variant="standard" 
                              value={pickUpDate}
                              disabled={disableForm}
                              required
                            />
                          </DateRangePicker>
                        </FormControl>
                      </Grid>
                    </Grid>
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