import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../../components/Layouts/Topmenu";
import Sidemenu from "../../../components/Layouts/Sidemenu";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Chip,Grid,Stack,Button,Typography,TextField,FormControl,InputLabel,Select,MenuItem,Box
} from '@mui/material';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';




const Create = () => {

  const router = useRouter();

  const { otdId } = router.query;

  const pageTitle = 'Update OTD';

  const [otdData,getOtdData] = useState([]);

  const [vendor, setVendor] = useState('');
  const [crewArr, setCrewArr] = useState([]);
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [omtTrackingNumber, setOmtTrackingNumber] = useState('');
  const [concern, setConcern] = useState('');
  const [crew, setCrew] = useState(0);

  const [callStart, setCallStart] = useState();
  const [callStartUnix, setCallStartUnix] = useState();
  const [callEnd, setCallEnd] = useState();
  const [callEndUnix, setCallEndUnix] = useState();
  const [errorBorderCallStart, setErrorBorderCallStart] = useState(false);
  const [errorBorderCallEnd, setErrorBorderCallEnd] = useState(false);

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
  

  const getOtd = async (otdId) => {

    await axios.post('/api/otd_request/getOtdDetails',{
      id : otdId
    })
    .then( (result) => {
      
      getOtdData(result.data);
      setOmtTrackingNumber(result.data.omt_tracking_num);
      setConcern(result.data.concern);
      setCrew(result.data.crew_id);
      setCallStart(moment(result.data.start).format('HH:mm'));
      setCallStartUnix(moment(result.data.start).unix());
      setCallEnd(moment(result.data.end).format('HH:mm'));
      setCallEndUnix(moment(result.data.end).unix());
    })
    .catch( (err) => {
      console.log(err);
    });
  };

  const getCrewArr = async () => {

    const result = await axios.get('/api/settings/getCrew');

    setCrewArr(result.data);
  };

  

  useEffect(() => {

    getOtd(otdId);
    getCrewArr()

    return () => {
      getOtdData([]);
      setCrewArr([]);
    }

  }, [otdId]);


  
  const submitData = e => {

    e.preventDefault();

    setSubmitDisabled(true);
    setBtnDisabled(true);
    setDisableForm(true);

    const url = '/api/otd_request/updateOtd'
    const data = {
      id: otdId,
      concern: concern,
      crew_id: crew,
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
                      <Grid item xs={12} lg={12}>
                        <Chip 
                          label={otdData.vendor_name} 
                          variant="filled" 
                          color='error'
                          style={{fontSize:22}}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="OMT Tracking Number" 
                            variant="standard" 
                            value={omtTrackingNumber}
                            disabled={true}
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
                              className: 'call_start',
                              label: 'Call Start',
                              errorBorder: errorBorderCallStart,
                              isDisabled: true
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
                              className: 'call_end',
                              label: 'Call End',
                              errorBorder: errorBorderCallEnd,
                              isDisabled: true
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