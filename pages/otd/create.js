import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import ReactSelect from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  Grid,Stack,Button,Typography,TextField,FormControl,InputLabel,Select,MenuItem,Box
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';


const Create = () => {

  const router = useRouter();

  const pageTitle = 'New OTD';

  const [vendorArr,setVendorArr] = useState([]);
  const [crewArr, setCrewArr] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [omtTrackingNumber, setOmtTrackingNumber] = useState('');
  const [concern, setConcern] = useState('');
  const [crew, setCrew] = useState('');
  
  const [callStart, setCallStart] = useState();
  const [callStartUnix, setCallStartUnix] = useState();
  const [callEnd, setCallEnd] = useState();
  const [callEndUnix, setCallEndUnix] = useState();
  const [errorBorderCallStart, setErrorBorderCallStart] = useState(false);
  const [errorBorderCallEnd, setErrorBorderCallEnd] = useState(false);

  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [submitDisabled,setSubmitDisabled] = useState(false);
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  const handleCallStart = (date, label) => {
    const time = moment(date).format('HH:mm');
    const datetime = moment(date).unix();
    setCallStart(time);
    setCallStartUnix(datetime);

    console.log(datetime);
    console.log(callEndUnix);
    
    if(callEndUnix){
      if(datetime <= callEndUnix){
        console.log("Valid Time");
        setSubmitDisabled(false);
        setErrorBorderCallStart(false);
      }
      else{
        console.log("Invalid Time");
        setSubmitDisabled(true);
        setErrorBorderCallStart(true);
      }
    }
    
  }

  const openCallStart = () => {
    const date = moment().format('YYYY-MM-DD HH:mm');
    const time = moment(date).format('HH:mm');
    const datetime = moment(date).unix();
    setCallStart(time);
    setCallStartUnix(datetime);
  }

  const handleCallEnd = (date, label) => {
    const time = moment(date).format('HH:mm');
    const datetime = moment(date).unix();
    setCallEnd(time);

    console.log('label => ' + label );
    console.log('Call Start => ' + callStartUnix );
    console.log(datetime);

    if(datetime >= callStartUnix){
      console.log("Valid Time");
      setSubmitDisabled(false);
      setErrorBorderCallEnd(false);
    }
    else{
      console.log("Invalid Time");
      setSubmitDisabled(true);
      setErrorBorderCallEnd(true);
    }

  }

  const openCallEnd = () => {
    const date = moment().format('YYYY-MM-DD HH:mm');
    const time = moment(date).format('HH:mm');
    const datetime = moment(date).unix();
    setCallEnd(time);
    setCallEndUnix(datetime);
  }

  const renderInput = (props,openCalendar,closeCalendar) => {

    return <TextField
            {...props}
            error={props.errorBorder}
            id="outlined-search"
            variant="standard" 
            size="small"
            label={props.label}
            helperText={props.errorBorder==true?'Invalid Time':''}
            disabled={props.isDisabled}
          />
  }

  const getCrewArr = async () => {

    const result = await axios.get('/api/settings/getCrew');

    setCrewArr(result.data);
  };

  const getVendorArr = async () => {

    const result = await axios.get('/api/vendor_request/getVendorNameList');

    setVendorArr(result.data);
  };
  
  useEffect(() => {

    console.clear();

    getVendorArr();
    getCrewArr();

    return () => {
        setVendorArr([]);
        setCrewArr([]);
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

        setSubmitDisabled(true);
        setBtnDisabled(true);
        setDisableForm(true);
        
        const url = '/api/otd_request/createOtd';
        const start = moment().format('YYYY-MM-DD') + ' ' + callStart;
        const end = moment().format('YYYY-MM-DD') + ' ' + callEnd;
        const aht = moment(end).diff(moment(start),'minutes');

        const data = {
          otd_date: moment().format('YYYY-MM-DD'),
          vendor_id: vendor.value,
          omt_tracking_num: omtTrackingNumber,
          concern: concern,
          crew_id: crew,
          aht: ('0'+Math.floor(aht / 60)).slice(-2) + ':' + ('00' + (aht % 60)).slice(-2),
          start: start,
          end: end,
          user: localStorage.name,
          encode_date:  moment().format('YYYY-MM-DD HH:mm')
        }
        
        // console.log(data);
        const notifId = toast.loading("Please wait...");
        
        axios.post(url, data)
        .then( res => {
          // resolve(res);
          setTimeout(() => {
            toast.update(notifId, {
              render: "New OTD has been created", 
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
                router.push("/otd");
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
                setSubmitDisabled(false);
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
                            disabled={submitDisabled}
                            children="Save"
                          />
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/otd')}
                            children="Cancel"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        <ReactSelect 
                          value={vendor}
                          options={vendorArr} 
                          onChange={handleVendorName}
                          isClearable={true}
                          placeholder="Select Vendor"
                          isDisabled={disableForm}
                          size='small'
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
                      <Grid item xs={12} lg={12}>
                        <FormControl  sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="OMT Tracking Number" 
                            variant="standard" 
                            value={omtTrackingNumber}
                            disabled={disableForm}
                            size='small'
                            required
                            onChange={ e => {
                              setOmtTrackingNumber(e.target.value) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <FormControl  sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="Concern" 
                            variant="standard" 
                            value={concern}
                            disabled={disableForm}
                            size='small'
                            required
                            onChange={ e => {
                              setConcern(e.target.value) 
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel>Crew</InputLabel>
                            <Select
                              value={crew}
                              onChange={ e => setCrew(e.target.value) }
                              label="Crew"
                              size='small'
                              disabled={disableForm}
                            >
                              
                              {crewArr.map( crew => (
                                <MenuItem key={crew.value} value={crew.value}>
                                  {crew.label + ' ' + crew.technician}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                      </Grid>

                      <Grid item xs={12} lg={12}>
                        {/* <InputLabel>Call Start</InputLabel> */}
                        <FormControl sx={{ m: 1 }} variant="standard">
                          <Datetime
                            dateFormat={false}
                            inputProps={{ 
                              placeholder: "Select Call Start",
                              required: true,
                              className: '',
                              label: 'Call Start',
                              errorBorder: errorBorderCallStart,
                              isDisabled: disableForm
                            }}
                            timeFormat={'HH:mm'}
                            onOpen={ openCallStart }
                            onChange={handleCallStart}
                            value={callStart}
                            input={true}
                            renderInput={renderInput}
                          />
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} lg={12}>
                        {/* <InputLabel>Call End</InputLabel> */}
                        <FormControl sx={{ m: 1 }} variant="standard">
                          <Datetime
                            dateFormat={false}
                            inputProps={{ 
                              placeholder: "Select Call End",
                              required: true,
                              className: '',
                              label: 'Call End',
                              errorBorder: errorBorderCallEnd,
                              isDisabled: disableForm
                            }}
                            timeFormat={'HH:mm'}
                            onOpen={ openCallEnd }
                            onChange={handleCallEnd}
                            value={callEnd}
                            input={true}
                            renderInput={renderInput}
                          />
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