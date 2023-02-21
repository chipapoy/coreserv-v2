import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';

const Create = () => {

    const router = useRouter();

    const [cityArr,setCityArr] = useState([]);
    const [tierArr,setTierArr] = useState([]);
    const [accountArr,setAccountArr] = useState([]);
    const [accountTypeArr,setAccountTypeArr] = useState([]);
    const [paymentTermsArr,setPaymentTermsArr] = useState([]);
    const [soaTypeArr,setSoaTypeArr] = useState([]);
    const [skyContactArr,getSkyContactDetails] = useState([]);
    const autoRenewSelection = [
        {value:'Yes',label:'Yes'},
        {value:'No',label:'No'},
        {value:'N/A',label:'N/A'}
    ];
    const withPenaltySelection = [
        {value:'Yes',label:'Yes'},
        {value:'No',label:'No'},
        {value:'N/A',label:'N/A'}
    ];

    const [city, setCity] = useState('');
    const [tier, setTier] = useState('');
    const [account, setAccount] = useState('');
    const [accountType, setAccountType] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [soa, setSoa] = useState('');
    const [autoRenew, setAutoRenew] = useState('');
    const [withPenalty, setWithPenalty] = useState('');
    const [skyContactId, setSkyContactId] = useState('');

    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [btnDisabled,setBtnDisabled] = useState(false);
    const [disableForm,SetDisableForm] = useState(false);


    useEffect(() => {

        const getCityArr = async () => {

            const result = await axios.get('/api/settings/getCityList');

            setCityArr(result.data);
        };

        const getTierArr = async () => {

            const result = await axios.get('/api/settings/getTierList');

            setTierArr(result.data);
        };

        const getAccountArr = async () => {

            const result = await axios.get('/api/settings/getAccountList');

            setAccountArr(result.data);
        };

        const getAccountTypeArr = async () => {

            const result = await axios.get('/api/settings/getAccountTypeList');

            setAccountTypeArr(result.data);
        };

        const getPaymentTermsArr = async () => {

            const result = await axios.get('/api/settings/getPaymentTermList');

            setPaymentTermsArr(result.data);
        };

        const getSoaTypeArr = async () => {

            const result = await axios.get('/api/settings/getSoaTypeList');

            setSoaTypeArr(result.data);
        };

        const getSkyContactArr = async () => {

            const result = await axios.get('/api/settings/getSkyContactDetails');
  
            getSkyContactDetails(result.data);
        };

        getCityArr();
        getTierArr();
        getAccountArr();
        getAccountTypeArr();
        getPaymentTermsArr();
        getSoaTypeArr();
        getSkyContactArr();

        return () => {
            setCityArr([]);
            setTierArr([]);
            setAccountArr([]);
            setAccountTypeArr([]);
            setPaymentTermsArr([]);
            setSoaTypeArr([]);
            getSkyContactDetails([]);
        }

    }, []);

    const submitData = async (e) => {
        e.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);

        const data = {
            vendor_name: e.target.vendorName.value,
            vendor_code: e.target.vendorCode.value,
            tin_num: e.target.tinNum.value,
            address: e.target.address.value,
            bldg_name: e.target.bldg.value,
            city: city.value === undefined ? '' : city.value,
            contact_person: e.target.contactPerson.value,
            contact_num: e.target.contactNum.value,
            kam: e.target.kam.value,
            tier: tier.value === undefined ? '' : tier.value,
            account: account.value === undefined ? '' : account.value,
            account_type: accountType.value === undefined ? '' : accountType.value,
            payment_terms: paymentTerms.value === undefined ? '' : paymentTerms.value,
            soa_type: soa.value === undefined ? '' : soa.value,
            bank_details: e.target.bankDetails.value,
            remarks: e.target.remarks.value,
            moa_duration: e.target.moaDuration.value,
            moa_status: e.target.moaStatus.value,
            terms: e.target.terms.value,
            auto_renew: autoRenew.value === undefined ? '' : autoRenew.value,
            with_penalty: withPenalty.value === undefined ? '' : withPenalty.value,
            sky_contact_id: skyContactId.value === undefined ? '' : skyContactId.value
        }

        // console.log(data);
        // API endpoint where we send form data.
        const url = '/api/vendor_request/createVendor'

        await axios.post(url, data)
        .then( res => {

            // console.log(res);

            if(res.status === 200){

                toast.success('New Vendor Added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark"
                })
                
                toast.onChange(v => {
                    if(v.status === "removed"){
                        router.push("/vendors")
                    }
                });
            }  
            else{

                setSubmitBtn('Submit');
                setBtnDisabled(false);

                toast.error('Unable to connect to server. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            }

        })
        .catch(err => {

            setSubmitBtn('Submit');
            setBtnDisabled(false);
            
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });

            toast.onChange(v => {
                if(v.status === "removed"){
                    router.push("/vendors/create")
                }
            });
        })
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
                            <h4>Create new vendor</h4>
                            <form onSubmit={submitData}>
                              <div className="card">
                                <div className="card-body">
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} lg={2}>
                                      <Stack spacing={2} direction="row">
                                        <Button 
                                          disableElevation
                                          variant="outlined" 
                                          color="primary" 
                                          type="submit"
                                        >Save</Button>
                                        <Button 
                                          disableElevation
                                          variant="outlined" 
                                          color="error" 
                                          onClick={()=>router.push('/vendors')}
                                        >Cancel</Button>
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                  <Divider />
                                  <List>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="vendorName"
                                          label="Vendor Name" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="vendorCode"
                                          label="Vendor Code" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="tinNum"
                                          label="Tin Num" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="address"
                                          label="Address" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="bldg"
                                          label="Building Name" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">City</label>
                                        <Select 
                                            value={city}
                                            options={cityArr} 
                                            onChange={ (val) => setCity(val)}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="contactPerson"
                                          label="Contact Person" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="contactNum"
                                          label="Contact #" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="kam"
                                          label="KAM" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Tier</label>
                                        <Select 
                                            value={tier}
                                            options={tierArr} 
                                            onChange={ (val) => setTier(val)}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Account</label>
                                        <Select 
                                            value={account}
                                            options={accountArr} 
                                            onChange={ (val) => setAccount(val)}
                                            isDisabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Account Type</label>
                                        <Select 
                                            value={accountType}
                                            options={accountTypeArr} 
                                            onChange={ (val) => setAccountType(val)}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Payment Terms</label>
                                        <Select 
                                            value={paymentTerms}
                                            options={paymentTermsArr} 
                                            onChange={ (val) => setPaymentTerms(val)}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">SOA Type</label>
                                        <Select 
                                            value={soa}
                                            options={soaTypeArr} 
                                            onChange={ (val) => setSoa(val)}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="bankDetails"
                                          label="Bank Details" 
                                          variant="standard" 
                                          multiline
                                          maxRows={4}
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="remarks"
                                          label="Remarks" 
                                          variant="standard" 
                                          multiline
                                          maxRows={4}
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="moaDuration"
                                          label="Moa Duration" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="moaStatus"
                                          label="Moa Status" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <TextField 
                                          id="terms"
                                          label="Terms" 
                                          variant="standard" 
                                          disabled={disableForm}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Auto Renewal</label>
                                        <Select 
                                            value={autoRenew}
                                            options={autoRenewSelection} 
                                            onChange={ (val) => setAutoRenew(val) }
                                            isDisabled={disableForm}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                    <ListItem divider='true' alignItems="flex-start">
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">With Penalty</label>
                                        <Select 
                                            value={withPenalty}
                                            options={withPenaltySelection} 
                                            onChange={ (val) => setWithPenalty(val) }
                                            isDisabled={disableForm}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                        <label className="form-label">Sky Contact</label>
                                        <Select 
                                            value={skyContactId}
                                            options={skyContactArr} 
                                            onChange={ (val) => setSkyContactId(val) }
                                            isDisabled={disableForm}
                                            isClearable={true}
                                        />
                                      </FormControl>
                                    </ListItem>
                                  </List>
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