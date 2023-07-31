import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Grid,Stack,Chip,TextField,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  const pageTitle = 'Dispatch Activity';

  const [dispatchData,setDispatchData] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [dispatchDate, setDispatchDate] = useState(moment().format('M/DD/YYYY'));
  const [pickupDate, setPickupDate] = useState(moment().format('M/DD/YYYY'));
  const [crew, setCrew] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const [crewArr, setCrewArr] = useState([]);
  const [remarksArr, setRemarksArr] = useState([]);
  const [statusArr, setStatusArr] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setCrew('');
    setOpen(false);
    props.modalFunction({
      open: false,
      cancel: true
    });
  }
  // const handleOpen = () => setOpen();
  
  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

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


  const handleDispatchDate = (e, picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setDispatchDate(date);
  }

  const handlePickupDate = (e, picker) => {
    var date = moment(picker.startDate).format('M/DD/YYYY');
    setPickupDate(date);
  }

  const dateViewFormat = date => {
    date = moment(date).format('M/DD/YYYY');
    return date;
  }

  useEffect(() => {

    // console.clear();
    
    
    if(props.open){
      // getDispatchData(props.dispId);
      console.log("from NewActivity.js");
      
      getCrewArr();
      getRemarksArr();
      getStatusArr();
    }

    setOpen(props.open);
    

    return () => {
      // setDispatchData([]);
      setCrewArr([]);
      setRemarksArr([]);
      setStatusArr([]);
    }

  }, [props]);

  const submitData = e => {
    
    e.preventDefault();

    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/dispatch_request/insertActivity'
    const data = {
      dispatch_id: props.dispDetails[0],
      disp_date: moment(dispatchDate).format('YYYY-MM-DD'),
      pickup_date: moment(pickupDate).format('YYYY-MM-DD'),
      crew_id: crew,
      user: localStorage.name,
      encode_date:  moment().format('YYYY-MM-DD HH:mm')
      // or_date: moment(orDate).format('YYYY-MM-DD'),
      // pickup_date: moment(pickUpDate).format('YYYY-MM-DD')
    }
    
    // console.log(data)
    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "Dispatch activity has been added", 
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
            setCrew('');
            setBtnDisabled(false);
            setDisableForm(false);
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
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Stack spacing={2} direction="row">
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
              <Grid item xs={12} lg={12}>
                <Chip 
                  label={props.dispDetails[4]} 
                  variant="filled" 
                  color='error'
                  style={{fontSize:22}}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handleDispatchDate}
                    onCancel={ (e,picker)=>setDispatchDate('')}
                  >
                    <TextField 
                      label="Dispatch Date" 
                      variant="standard" 
                      value={dispatchDate}
                      disabled={disableForm}
                      required
                    />
                  </DateRangePicker>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      drops: "up",
                      locale: {
                        cancelLabel: 'Clear'
                      }
                    }}
                    onApply={handlePickupDate}
                    onCancel={ (e,picker)=>setPickupDate('')}
                  >
                    <TextField 
                      label="Pick-up Date" 
                      variant="standard" 
                      value={pickupDate}
                      disabled={disableForm}
                      required
                    />
                  </DateRangePicker>
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
                    required
                  >
                    
                    {crewArr.map( crew => (
                      <MenuItem key={crew.value} value={crew.value}>
                        {crew.label + ' ' + crew.technician}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} lg={12}>
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
                    label="Remarks"
                    disabled={true}
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
                    label="Status"
                    disabled={true}
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
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  
                    <TextField 
                      label="Completion Date" 
                      variant="standard" 
                      value={completionDate}
                      disabled={true}
                    />
                </FormControl>
              </Grid> */}
            </Grid>
          </Box>
        </form>
      </Modal>
    </div>
  );
}