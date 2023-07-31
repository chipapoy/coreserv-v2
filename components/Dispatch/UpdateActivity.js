import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Grid,Stack,Chip,TextField,FormControl,InputLabel,Select,MenuItem,ButtonGroup,
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #DDDDDD',
  boxShadow: 5,
  p: 2,
};

export default function UpdateActivityModal(props) {

  const pageTitle = 'Update Dispatch Activity';

  const [activityData,setActivityData] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [dispatchDate, setDispatchDate] = useState(moment().format('M/DD/YYYY'));
  const [pickupDate, setPickupDate] = useState(moment().format('M/DD/YYYY'));
  const [assignedTo, setAssignedTo] = useState('');
  const [crew, setCrew] = useState(0);
  const [actionTaken, setActionTaken] = useState('');
  const [remarks, setRemarks] = useState(0);
  const [status, setStatus] = useState(0);
  const [completionDate, setCompletionDate] = useState('');
  const [receivedDateByAbsCbn, setReceivedDateByAbsCbn] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [receivedDateByVergara, setReceivedDateByVergara] = useState('');
  const [receivedByVergara, setReceivedByVergara] = useState('');


  const [crewArr, setCrewArr] = useState([]);
  const [remarksArr, setRemarksArr] = useState([]);
  const [statusArr, setStatusArr] = useState([]);


  const handleClose = () => {

    setActivityData([]);
    setDispatchDate('');
    setPickupDate('');
    setCrew(0);
    setActionTaken('');
    setRemarks(0);
    setStatus(0);
    setCompletionDate('');
    setReceivedDateByAbsCbn('');
    setReceivedBy('');
    setReceivedDateByVergara('');
    setReceivedByVergara('');
    
    props.modalFunction({
      open: false,
      cancel: true,
      update: false
    });
  }
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  const [fileUpload,setFileUpload] = useState([]);
  const [uploadBtnDisabled,setUploadBtnDisabled] = useState(true);

  const getActivityDetails = async () => {

    await axios.post('/api/dispatch_request/getActivityDetails',{
      id: props.openUpdateModal.id
    })
    .then( result => {
      setActivityData(result.data);
      setDispatchDate(moment(result.data.disp_date).format('M/DD/YYYY'));
      setPickupDate(result.data.pickup_date!=null ? moment(result.data.pickup_date).format('M/DD/YYYY') : '');
      setCrew(result.data.crew_id);
      setActionTaken(result.data.action_taken);
      setRemarks(result.data.remarks_id);
      setStatus(result.data.status_id);
      setCompletionDate(result.data.completion_date!=null ? moment(result.data.completion_date).format('M/DD/YYYY') : '');
      setReceivedDateByAbsCbn(result.data.abs_cbn_received_date != null ? moment(result.data.abs_cbn_received_date).format('M/DD/YYYY') : '');
      setReceivedBy(result.data.received_by);
    })
    .catch( err => {
      console.log(err)
    });
  };

  const getCrewArr = async () => {

    const result = await axios.get('/api/dispatch_request/getCrew');

    setCrewArr(result.data);
  };

  const getRemarksArr = async () => {

    const result = await axios.get('/api/dispatch_request/getRemarks');

    setRemarksArr(result.data);
  };

  const getStatusArr = async () => {

    const result = await axios.get('/api/dispatch_request/getStatus');

    setStatusArr(result.data);
  };


  const handleReceivedDateByAbsCbn = (e,picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setReceivedDateByAbsCbn(date);
    // console.log(date);
  }

  const handleReceivedDateByVergara = (e,picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setReceivedDateByVergara(date);
    // console.log(date);
  }

  const handleCompletionDate = (e,picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setCompletionDate(date);
  }

  const dateViewFormat = date => {
    date = moment(date).format('M/DD/YYYY');
    return date;
  }

  useEffect(() => {

    // console.clear();

    if(props.openUpdateModal.id !== null){

      console.log("from UpdateActivity.js");
      
      getActivityDetails()
      getCrewArr();
      getRemarksArr();
      getStatusArr();

    }

    return () => {
      // setDispatchData([]);
      setActivityData([]);
      setCrewArr([]);
      setRemarksArr([]);
      setStatusArr([]);
    }

  }, [props]);

  const submitData = e => {
    
    e.preventDefault();

    // setBtnDisabled(true);
    // setDisableForm(true);
    
    const url = '/api/dispatch_request/updateActivity'
    const data = {
      // dispatch_id: props.dispId,
      id: props.openUpdateModal.id,
      // disp_date: moment(dispatchDate).format('YYYY-MM-DD'),
      // crew_id: crew,
      action_taken: actionTaken,
      remarks_id: remarks,
      status_id: status,
      complete_date: moment(completionDate).format('YYYY-MM-DD'),
      abs_cbn_received_date: moment(receivedDateByAbsCbn).format('YYYY-MM-DD'),
      received_by: receivedBy,
      vergara_received_date: moment(receivedDateByVergara).format('YYYY-MM-DD'),
      received_by_vergara: receivedByVergara,
      user: localStorage.name,
      update_date:  moment().format('YYYY-MM-DD HH:mm')
      // pickup_date: moment(pickUpDate).format('YYYY-MM-DD')
    }
    
    // console.log(data)
    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "Dispatch activity has been updated", 
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
            setActivityData([]);
            setDispatchDate('');
            setPickupDate('');
            setCrew(0);
            setActionTaken('');
            setRemarks(0);
            setStatus(0);
            setCompletionDate('');
            setReceivedDateByAbsCbn('');
            setReceivedBy('');
            setReceivedDateByVergara('');
            setReceivedByVergara('');
            
            props.modalFunction({
              open: false,
              cancel: false,
              update: true
            });
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
    <div>
      <Modal
        open={props.openUpdateModal.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitData}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{pageTitle}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Chip 
                  label={activityData.vendor_name} 
                  variant="filled" 
                  color='error'
                  style={{fontSize:22}}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  {/* <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      autoApply: true
                    }}
                    onCallback={handleDispatchDate}
                  > */}
                    <TextField 
                      label="Dispatch Date" 
                      variant="standard" 
                      value={dispatchDate}
                      disabled={disableForm}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  {/* </DateRangePicker> */}
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  {/* <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      autoApply: true
                    }}
                    onCallback={handleDispatchDate}
                  > */}
                    <TextField 
                      label="Pickup Date" 
                      variant="standard" 
                      value={pickupDate}
                      disabled={disableForm}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  {/* </DateRangePicker> */}
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Crew</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={crew}
                    onChange={ e => setCrew(e.target.value) }
                    label="Crew"
                    readOnly={true}
                  >
                    
                    {crewArr.map( crew => (
                      <MenuItem key={crew.value} value={crew.value} >
                        {crew.label + ' ' + crew.technician}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Action Taken" 
                    variant="standard" 
                    multiline
                    maxRows={4}
                    value={actionTaken}
                    onChange={ e => setActionTaken(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Remarks</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={remarks}
                    onChange={ e => setRemarks(e.target.value) }
                    label="Crew"
                  >
                    
                    {remarksArr.map( remark => (
                      <MenuItem key={remark.value} value={remark.value}>
                        {remark.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={status}
                    onChange={ e => setStatus(e.target.value) }
                    label="Crew"
                  >
                    
                    {statusArr.map( stat => (
                      <MenuItem key={stat.value} value={stat.value}>
                        {stat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1, display:remarks==8?'inline-flex':'none' }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      minDate  : moment().format('MM/DD/YYYY'),
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handleCompletionDate}
                    onCancel={ (e,picker)=>setCompletionDate('')}
                    showDropdowns={false}
                  >
                    <TextField 
                      label="Completion Date" 
                      variant="standard"
                      value={completionDate}
                    />
                  </DateRangePicker>
                </FormControl>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      minDate  : moment().format('MM/DD/YYYY'),
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handleReceivedDateByAbsCbn}
                    onCancel={ (e,picker)=>setReceivedDateByAbsCbn('')}
                  >
                    <TextField 
                      label="Received Date by ABS-CBN" 
                      variant="standard" 
                      value={receivedDateByAbsCbn}
                    />
                  </DateRangePicker>
                </FormControl>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Received by ABS-CBN" 
                    variant="standard" 
                    multiline
                    maxRows={4}
                    value={receivedBy}
                    onChange={ e => setReceivedBy(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      minDate  : moment().format('MM/DD/YYYY'),
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handleReceivedDateByVergara}
                    onCancel={ (e,picker)=>setReceivedDateByVergara('')}
                  >
                    <TextField 
                      label="Received Date by Vergara" 
                      variant="standard" 
                      value={receivedDateByVergara}
                    />
                  </DateRangePicker>
                </FormControl>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Received by Vergara" 
                    variant="standard" 
                    multiline
                    maxRows={4}
                    value={receivedByVergara}
                    onChange={ e => setReceivedByVergara(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Stack spacing={1} direction="row">
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="primary" 
                    type="submit"
                    disabled={btnDisabled}
                  >Submit</Button>
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="error" 
                    disabled={btnDisabled}
                    onClick={ handleClose }
                  >Cancel</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </div>
  );
}