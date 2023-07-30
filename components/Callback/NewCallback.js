import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Grid,Stack,Chip,TextField,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
// import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
// import DateTimePicker from 'react-datetimepicker-bootstrap';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import { BorderColor } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #DDDDDD',
  boxShadow: 5,
  p: 2,
};

export default function BasicModal(props) {

  const pageTitle = 'New Callback';

  const [vendor, setVendor] = useState('');

  const [countAttempt,setCountAttempt] = useState(0);

  const [callStart, setCallStart] = useState();
  const [callStartUnix, setCallStartUnix] = useState();
  const [callEnd, setCallEnd] = useState();
  const [callEndUnix, setCallEndUnix] = useState();

  const [statusArr, setStatusArr] = useState([]);
  const [callbackStatus, setCallbackStatus] = useState('');

  const [remarks, setRemarks] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const handlePreferredDate = (e,picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setPreferredDate(date);
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setCallStart();
    setCallStartUnix();
    setCallEnd();
    setCallEndUnix();
    setErrorBorderCallStart(false);
    setErrorBorderCallEnd(false);
    setCallbackStatus('');
    setRemarks('');
    setPreferredDate('');
    
    setSubmitDisabled(false);
    setBtnDisabled(false);
    setDisableForm(false);
    props.modalFunction({
      open: false,
      cancel: true
    });
  }
  // const handleOpen = () => setOpen();
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [submitDisabled,setSubmitDisabled] = useState(false);
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);
  const [errorBorderCallStart, setErrorBorderCallStart] = useState(false);
  const [errorBorderCallEnd, setErrorBorderCallEnd] = useState(false);

  const getStatusArr = async () => {

    const result = await axios.get('/api/callback_request/getCallbackStatus');

    setStatusArr(result.data);
  };

  const getCallbackCount = async () => {

    const data = {
      callbackId: props.callbackDetails[0]
    }

    const result = await axios.post('/api/callback_request/getCallbackCount',data);

    setCountAttempt(result.data.Total+1);
  };
  
  const handleCallStart = (date, label) => {
    const time = moment(date).format('HH:mm');
    const datetime = moment(date).unix();
    setCallStart(time);
    setCallStartUnix(datetime);

    // console.log(callEnd);
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

  const handleCompletionDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setCompletionDate(date);
  }

  const dateViewFormat = date => {
    date = moment(date).format('M/DD/YYYY');
    return date;
  }

  const timeLabel = {
    label: {
      color: "rgba(0, 0, 0, 0.26)",
      cursor: "pointer",
      display: "inline-flex",
      fontSize: "14px",
      transition: "0.3s ease all",
      lineHeight: "1.428571429",
      fontWeight: "400",
      paddingLeft: "0"
    }
  };

  // const addOneDay = () => {
  //   const date = new Date();
  //   date.setDate(date.getDate() + 1);
  //   return date;
  // }

  const renderInput = (props,openCalendar,closeCalendar) => {

    return <TextField
            {...props}
            error={props.errorBorder}
            id="outlined-search"
            variant="standard"
            size="small"
            label={props.label}
            helperText={props.errorBorder==true?'Invalid Time':''}
          />
  }

  useEffect(() => {
    
    if(props.open){
      // getDispatchData(props.dispId);
      console.log("from NewCallback.js");
      
      getStatusArr();
      getCallbackCount();
    }
    setOpen(props.open);

    return () => {
      setStatusArr([]);
      setCountAttempt(0);
    }

  }, [props]);

  const submitData = e => {
    
    e.preventDefault();

    setSubmitDisabled(true);
    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/callback_request/insertCallbackDetails';

    const start = moment().format('YYYY-MM-DD') + ' ' + callStart;
    const end = moment().format('YYYY-MM-DD') + ' ' + callEnd;
    const aht = moment(end).diff(moment(start),'minutes');
    
    const data = {
      callback_id: props.callbackDetails[0],
      status_id: callbackStatus,
      attempt_count: countAttempt,
      start: moment().format('YYYY-MM-DD') + ' ' + callStart,
      end: moment().format('YYYY-MM-DD') + ' ' + callEnd,
      aht: ('0'+Math.floor(aht / 60)).slice(-2) + ':' + ('00' + (aht % 60)).slice(-2),
      remarks: remarks,
      preferred_date: moment(preferredDate).format('YYYY-MM-DD'),
      user: localStorage.name,
      encode_date:  moment().format('YYYY-MM-DD HH:mm')
    }
    
    // console.log(data)
    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "Callback details have been added", 
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
            // router.push("/dispatch");
            props.modalFunction({
              open: false,
              cancel: false
            });
            setSubmitDisabled(false);
            setBtnDisabled(false);
            setDisableForm(false);

            setCallStart();
            setCallStartUnix();
            setCallEnd();
            setCallEndUnix();
            setErrorBorderCallStart(false);
            setErrorBorderCallEnd(false);
            setCallbackStatus('');
            setRemarks('');
            setPreferredDate('')
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
            setCrew('');
            setBtnDisabled(false);
            setDisableForm(false);
          }
        });
      }, 2000);


    });
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitData}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{pageTitle}</Typography>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Chip 
                  label={props.callbackDetails[2]} 
                  variant="filled" 
                  color='error'
                  style={{fontSize:22}}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Chip 
                  label={'Call Attempt ' + countAttempt} 
                  variant="outlined" 
                  style={{fontSize:12}}
                />
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
                      errorBorder: errorBorderCallStart
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
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                  <Select
                    label="Status"
                    value={callbackStatus}
                    onChange={ e => setCallbackStatus(e.target.value) }
                    required
                  >
                    
                    {statusArr.map( status => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Remarks" 
                    variant="standard" 
                    multiline
                    maxRows={4}
                    value={remarks}
                    onChange={ e => setRemarks(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      minDate  : moment().add(1,'days').format('MM/DD/YYYY'),
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handlePreferredDate}
                    onCancel={ (e,picker)=>setPreferredDate('')}
                  >
                    <TextField 
                      label="Preferred Date" 
                      variant="standard" 
                      value={preferredDate}
                      disabled={disableForm}
                      required={ callbackStatus==2 || callbackStatus==10 ? true : false }
                    />
                  </DateRangePicker>
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
                      errorBorder: errorBorderCallEnd
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
              <Grid item xs={12} lg={12}>
                <Stack spacing={2} direction="row">
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="primary" 
                    type="submit"
                    disabled={submitDisabled}
                    children="Submit"
                  />
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="error" 
                    disabled={btnDisabled}
                    onClick={ handleClose }
                    children="Cancel"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </div>
  );
}