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
  Grid,Stack,Chip,Button,TextField,FormControl,Select,MenuItem
} from '@mui/material';
// import Select from 'react-select';




const Create = () => {

  const router = useRouter();

  const { dispId } = router.query;

  const pageTitle = 'Update Dispatch';

  const [dispatchData,setDispatchData] = useState([]);
  
  const [dispTypeArr,setDispTypeArr] = useState([]);

  const [dispType, setDispType] = useState(0);

  // const [vendor, setVendor] = useState('');
  // const [vendorBorder, setVendorBorder] = useState('#ced4da');
  // const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  // const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

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

  const handleCheckDate = (e, picker) => {
    var date = moment(picker.startDate).format('MM/DD/YYYY');
    setCheckDate(date);
  }

  const handleOrDate = (e, picker) => {
    var date = moment(picker.startDate).format('MM/DD/YYYY');
    setOrDate(date);
  }

  const handlePickUpDate = (e, picker) => {
    var date = moment(picker.startDate).format('MM/DD/YYYY');
    setPickUpDate(date);
  }

  const dateViewFormat = date => {
    date = moment(date).format('MM/DD/YYYY');
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
      setDispatchData(result.data);

      setCheckNumber(result.data.check_num);
      setCheckDate(dateViewFormat(result.data.check_date));
      setCheckAmount(result.data.amount);
      setRefNum(result.data.ref_num);
      setOrNumber(result.data.or_num);
      setOrDate(dateViewFormat(result.data.or_date));
      setPickUpDate(dateViewFormat(result.data.pickup_date));
      setDispType(result.data.disp_type)

    })
    .catch( err => {
      console.log(err)
    });
  }

  const getDispTypeArr = async () => {

    const result = await axios.get('/api/dispatch_request/getDispType');

    setDispTypeArr(result.data);
  };

  useEffect(() => {

    console.clear();

    getDispTypeArr();
    getDispatchData(dispId);

    return () => {
      getDispTypeArr([]);
      setDispatchData([]);
    }

  }, [dispId]);

  const submitData = e => {
    
    e.preventDefault();

    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/dispatch_request/updateDispatch'
    const data = {
      id: dispId,
      disp_type: dispType,
      check_num: checkNumber,
      check_date: moment(checkDate).format('YYYY-MM-DD'),
      amount: checkAmount,
      ref_number: refNumber,
      or_number: orNumber,
      or_date: moment(orDate).format('YYYY-MM-DD'),
      pickup_date: moment(pickUpDate).format('YYYY-MM-DD'),
      user: localStorage.name,
      update_date:  moment().format('YYYY-MM-DD HH:mm')
    }
    
    // console.log(data)
    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "Dispatch details has been updated", 
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
            router.push("/disp");
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
                          >Update</Button>
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/disp')}
                          >Cancel</Button>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Chip 
                          label={dispatchData.vendor_name} 
                          variant="filled" 
                          color='error'
                          style={{fontSize:25}}
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <label className="form-label">Dispatch Type</label>
                          <Select 
                              value={dispType}
                              // options={dispTypeArr} 
                              onChange={ e => setDispType(e.target.value)}
                              isDisabled={disableForm}
                          >
                            {dispTypeArr.map( type => (
                              <MenuItem key={type.value} value={type.value} >
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <TextField
                            label="Check Number" 
                            variant="standard" 
                            type='number'
                            value={checkNumber}
                            disabled={disableForm}
                            
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
                              locale: {
                                cancelLabel: 'Clear'
                              }
                            }}
                            onApply={handleCheckDate}
                            onCancel={ (e,picker)=>{
                              setCheckDate(checkDate);
                              console.log(moment(dispatchData.check_date).format('YYYY-MM-DD'));
                            }}
                          >
                            <TextField 
                              label="Check Date" 
                              variant="standard" 
                              value={checkDate!='Invalid date' ? checkDate : ''}
                              disabled={disableForm}
                              
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
                            value={checkAmount}
                            disabled={disableForm}
                            
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
                              // minDate  : moment(orDate).format('MM/DD/YYYY'),
                              locale: {
                                cancelLabel: 'Clear'
                              }
                            }}
                            onApply={handleOrDate}
                            onCancel={ (e,picker)=>setOrDate('')}
                          >
                            <TextField 
                              label="OR Date" 
                              variant="standard" 
                              value={orDate!='Invalid date' ? orDate : ''}
                              disabled={disableForm}
                              
                            />
                          </DateRangePicker>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                          <DateRangePicker
                            initialSettings={{
                              singleDatePicker: true,
                              // minDate  : moment(pickUpDate).format('MM/DD/YYYY'),
                              locale: {
                                cancelLabel: 'Clear'
                              }
                            }}
                            onApply={handlePickUpDate}
                            onCancel={ (e,picker)=>setPickUpDate('')}
                          >
                            <TextField 
                              label="Pick-up Date" 
                              variant="standard"
                              value={pickUpDate!='Invalid date' ? pickUpDate : ''}
                              disabled={disableForm}
                              
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