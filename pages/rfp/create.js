import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import { toast } from 'react-toastify';

import Select from 'react-select';

import {List,ListItem,ListItemText,Divider,Grid,Button,Box,Tabs,Tab } from '@mui/material';




const Create = () => {

  const router = useRouter();

  const pageTitle = 'Create RFP'

  const [vendorArr,setVendorArr] = useState([]);
  const [skyContactArr,setSkyContactArr] = useState([]);
  const [rfpTypeArr,setRfpTypeArr] = useState([]);

  const [vendor, setVendor] = useState('');
  const [vendorBorder, setVendorBorder] = useState('#ced4da');
  const [vendorError, setVendorError] = useState(0);

  const [rfpType, setRfpType] = useState('');
  const [rfpTypeBorder, setRfpTypeBorder] = useState('#ced4da');
  const [rfpTypeError, setRfpTypeError] = useState(0);

  
  const [skyContact, setSkyContact] = useState('');
  const [skyContactNum, setSkyContactNum] = useState('');
 

  

  const [submitBtn,setSubmitBtn] = useState('Submit');
  const [btnDisabled,setBtnDisabled] = useState(false);



  useEffect(() => {


      const getVendorArr = async () => {

          const result = await axios.get('/api/getVendorNameList');

          setVendorArr(result.data);
      };

      const getSkyContactArr = async () => {

          const result = await axios.get('/api/getSkyContactDetails');

          setSkyContactArr(result.data);
      };

      const getRfpTypeArr = async () => {

        const result = await axios.get('/api/getRfpTypeList');

        setRfpTypeArr(result.data);
    };

      getVendorArr();
      getSkyContactArr();
      getRfpTypeArr();

      return () => {
          setVendorArr([]);
          getSkyContactArr([]);
          getRfpTypeArr([]);
      }

  }, []);

  const handleVendorName = (val) => {

    setVendor(val);
    setVendorBorder('#ced4da');
    setVendorError(0);
    
    if(val===null) {
      setVendor([]);
      setVendorBorder('red');
      setVendorError(1);
    }  
    console.log(val)
  }

  const handleRfpType = (val) => {

    setRfpType(val);
    setRfpTypeBorder('#ced4da');
    setRfpTypeError(0);
    
    if(val===null) {
      setRfpType([]);
      setRfpTypeBorder('red');
      setRfpTypeError(1);
    }  
    console.log(val)
  }

  const handleSkyContactDetails = (val) => {
      // console.log(val.contact_number)
      setSkyContact(val);
      setSkyContactNum(val.contact_num);
  }

  const handleSkyContactNum = (e) => {
    setSkyContactNum(e.target.value);
  }


  // TAB PANEL
    function TabPanel(props) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
          )}
        </div>
      );
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

      console.log(vendor);

      if(vendor==="" || vendor===null){
        setVendorBorder('red');
        setVendorError(1);
      }
      else{
        setVendorBorder('#ced4da');
        setVendorError(0);
      }

      if(rfpType==="" || rfpType===null){
        setRfpTypeBorder('red');
        setRfpTypeError(1);
      }
      else{
        setRfpTypeBorder('#ced4da');
        setRfpTypeError(0);
      }

      const errorCount = vendorError + rfpTypeError;

      console.log(errorCount);

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
                      </Grid>
                      <Grid item xs={12} lg={2}>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          type="submit"
                        >Save</Button>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          onClick={()=>router.push('/rfp')}
                        >Cancel</Button>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valueTab} onChange={handleChange} aria-label="">
                          <Tab label="Detail 1" />
                          <Tab label="Detail 2" />
                          <Tab label="Detail 3" />
                        </Tabs>
                      </Box>
                      <TabPanel value={valueTab} index={0}>
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
                      </TabPanel>
                      <TabPanel value={valueTab} index={1}>
                          Item Two
                      </TabPanel>
                      <TabPanel value={valueTab} index={2}>
                          Item Three
                      </TabPanel>
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