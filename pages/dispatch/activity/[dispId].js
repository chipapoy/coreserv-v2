import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topmenu from "../../../components/Layouts/Topmenu";
import Sidemenu from "../../../components/Layouts/Sidemenu";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  Grid,Stack,Chip,Button,TextField,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
// import Select from 'react-select';




const Create = () => {

  const router = useRouter();

  const { dispId } = router.query;

  const pageTitle = 'Dispatch Activity';

  const [dispatchData,setDispatchData] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [dispatchDate, setDispatchDate] = useState(moment().format('M/DD/YYYY'));
  const [assignedTo, setAssignedTo] = useState('');
  const [crew, setCrew] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const [crewArr, setCrewArr] = useState([]);
  const [remarksArr, setRemarksArr] = useState([]);
  const [statusArr, setStatusArr] = useState([]);

  // const crewArr = [
  //   {value: 1, label: 'test1'},
  //   {value: 2, label: 'test2'},
  //   {value: 3, label: 'test3'}
  // ]

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

  const handleDispatchDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setDispatchDate(date);
  }

  const handleCompletionDate = (date, label) => {
    date = moment(date).format('M/DD/YYYY');
    setCompletionDate(date);
  }

  const dateViewFormat = date => {
    date = moment(date).format('M/DD/YYYY');
    return date;
  }

  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);


  const getDispatchData = async (dispId) => {

    await axios.post('/api/dispatch_request/getDispatchDetails',{
      id: dispId
    })
    .then( result => {
      // console.log(result.data)
      setDispatchData(result.data);
    })
    .catch( err => {
      console.log(err)
    });
  }

  useEffect(() => {

    console.clear();

    getDispatchData(dispId);
    getCrewArr();
    getRemarksArr();
    getStatusArr();

    

    return () => {
      setDispatchData([]);
      setCrewArr([]);
      setRemarksArr([]);
      setStatusArr([]);
    }

  }, [dispId]);

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

    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/dispatch_request/insertActivity'
    const data = {
      dispatch_id: dispId,
      disp_date: moment(dispatchDate).format('YYYY-MM-DD'),
      crew_id: crew,
      action_taken: actionTaken,
      remarks_id: remarks,
      status_id: status,
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
                          >Submit</Button>
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/dispatch')}
                          >Cancel</Button>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Chip 
                          label={dispatchData.vendor_name} 
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
                              autoApply: true
                            }}
                            onCallback={handleDispatchDate}
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
                          <InputLabel id="demo-simple-select-standard-label">Crew</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={crew}
                            onChange={ e => setCrew(e.target.value) }
                            label="Crew"
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
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              autoApply: true
                            }}
                            onCallback={handleCompletionDate}
                          >
                            <TextField 
                              label="Completion Date" 
                              variant="standard" 
                              value={completionDate}
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