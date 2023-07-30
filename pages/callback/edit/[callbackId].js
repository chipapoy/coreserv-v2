import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../../components/Layouts/Topmenu";
import Sidemenu from "../../../components/Layouts/Sidemenu";
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,Chip
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Viewfile from "../../../components/Rfp/Viewfile";




const Create = () => {

  const router = useRouter();

  const { callbackId } = router.query;

  const pageTitle = 'Update Callback';

  const [callbackData,getCallbackData] = useState([]);
  const [rfpType,setRfpType] = useState('');

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(vendor.value===undefined ? 1 : 0);
  const [displayErrorVendor, setDisplayErrorVendor] = useState('none');

  const [omtTrackingNumber, setOmtTrackingNumber] = useState('');

  const getCallback = async (callbackId) => {

    await axios.post('/api/callback_request/getCallbackListDetails',{
      id : callbackId
    })
    .then( (result) => {
      
      getCallbackData(result.data);
      setOmtTrackingNumber(result.data.omt_tracking_num);
    })
    .catch( (err) => {
      console.log(err);
    });
  };

  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  useEffect(() => {

    getCallback(callbackId);

    return () => {
        // getRfpDetails([]);
    }

  }, [callbackId]);


  
  const submitData = e => {

    e.preventDefault();

    setBtnDisabled(true);
    setDisableForm(true);

    const url = '/api/callback_request/updateCallback'
    const data = {
      id: callbackId,
      omt_tracking_num: omtTrackingNumber,
      user: localStorage.name,
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
            router.push("/callback");
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
                            children="Save"
                          />
                          <Button 
                            disableElevation
                            variant="outlined" 
                            color="error" 
                            disabled={btnDisabled}
                            onClick={()=>router.push('/callback')}
                            children="Cancel"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Chip 
                          label={callbackData.vendor_name} 
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
                            disabled={disableForm}
                            required
                            onChange={ e => {
                              setOmtTrackingNumber(e.target.value) 
                            }}
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