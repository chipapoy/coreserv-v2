import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../../components/Layouts/Topmenu";
import Sidemenu from "../../../components/Layouts/Sidemenu";
import { ToastContainer, toast } from 'react-toastify';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import moment from 'moment';

const Update = () => {

    const router = useRouter();
    const pageTitle = "Update Vendor";
    // const [recordId,setRecordId] = useState(router.query.id);
    const { vendorId } = router.query;

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

    const [vendorName, setVendorName] = useState('');
    const [vendorCode, setVendorCode] = useState('');
    const [bldg, setBldg] = useState('');
    const [city, setCity] = useState('');
    const [tinNum, setTinNum] = useState('');
    const [address, setAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [kam, setKam] = useState('');
    const [tier, setTier] = useState('');
    const [account, setAccount] = useState('');
    const [accountType, setAccountType] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [soa, setSoa] = useState('');
    const [bankDetail, setBankDetail] = useState('');
    const [remarks, setRemarks] = useState('');
    const [moaDuration, setMoaDuration] = useState('');
    const [terms, setTerms] = useState('');
    const [moaStatus, setMoaStatus] = useState('');
    const [autoRenew, setAutoRenew] = useState('');
    const [withPenalty, setWithPenalty] = useState('');
    const [skyContactId, setSkyContactId] = useState('');
    
    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [btnDisabled,setBtnDisabled] = useState(false);
    const [disableForm,SetDisableForm] = useState(false);
    

    useEffect(() => {
        
        let settingData = true;
        
        axios.post('/api/vendor_request/getVendorDetails', {
            id: vendorId
        })
        .then( (res) => {

            // console.log(data)
            const data = res.data[0];
            
            if(settingData){
                // setVendorDetails(data);
                setVendorName(data.vendor_name)
                setVendorCode(data.vendor_code)
                setBldg(data.bldg_name)
                setTinNum(data.tin_num)
                setAddress(data.address)
                setContactPerson(data.contact_person)
                setContactNum(data.contact_num)
                setKam(data.kam)
                setCity({'value':data.city, 'label':data.city})
                setTier({'value':data.tier_segment, 'label':data.tier_segment})
                setAccount({'value':data.account, 'label':data.account})
                setAccountType({'value':data.account_type, 'label':data.account_type})
                setPaymentTerms({'value':data.payment_terms, 'label':data.payment_terms})
                setSoa({'value':data.soa_type, 'label':data.soa_type})
                setBankDetail(data.bank_details)
                setRemarks(data.remarks)
                setMoaDuration(data.moa_duration)
                setTerms(data.terms)
                setMoaStatus(data.moa_status)
                setAutoRenew({'value':data.auto_renewal, 'label':data.auto_renewal})
                setWithPenalty({'value':data.with_penalty, 'label':data.with_penalty})
                setSkyContactId({'value':data.sky_contact_id, 'label':data.sky_contact_person})
            }
        })
        .catch( (err) => {

            if(settingData){
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

        return () => {
            settingData = false;
            // cancelToken.cancel();
            setVendorName('');
            setVendorCode('');
            setBldg('');
            setCity('');
            setTinNum('');
            setAddress('');
            setContactPerson('');
            setContactNum('');
            setKam('');
            setTier('');
            setAccount('');
            setAccountType('');
            setPaymentTerms('');
            setSoa('');
            setBankDetail('')
            setRemarks('')
            setMoaDuration('')
            setTerms('')
            setMoaStatus('')
            setAutoRenew('')
            setWithPenalty('')
            setSkyContactId('')
        }

    }, [vendorId]);

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

    const submitData = async (event) => {
        event.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);
        SetDisableForm(true)

        const data = {
            id: vendorId,
            vendor_name: vendorName,
            vendor_code: vendorCode,
            tin_num: tinNum,
            address: address,
            bldg_name: bldg,
            city: city.value,
            contact_person: contactPerson,
            contact_num: contactNum,
            kam: kam,
            tier: tier.value,
            account: account.value,
            account_type: accountType.value,
            payment_terms: paymentTerms.value,
            soa_type: soa.value,
            bank_details: bankDetail,
            remarks: remarks,
            moa_duration: moaDuration,
            moa_status: moaStatus,
            terms: terms,
            auto_renew: autoRenew.value,
            with_penalty: withPenalty.value,
            sky_contact_id: skyContactId.value,
            user: sessionStorage.name,
            update_date:  moment().format('YYYY-MM-DD HH:mm')
        }

        console.log(data);
        const url = '/api/vendor_request/updateVendor';

        const notifId = toast.loading("Please wait...");

        axios.post(url, data)
        .then( res => {
            

            setTimeout(() => {
              toast.update(notifId, {
                render: "Vendor has been updated", 
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
                  router.push("/vendors");
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
                  setSubmitBtn('Submit');
                  setBtnDisabled(false);
                  SetDisableForm(false)
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

                <Sidemenu></Sidemenu>
                
                <div className="page">
                    <Topmenu></Topmenu>
                    <div className="section-body">
                        <div className="container-fluid">
                            <h4>{pageTitle}</h4>
                            <form onSubmit={submitData} className="card">
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
                                        label="Vendor Name" 
                                        variant="standard" 
                                        value={vendorName}
                                        onChange={ e => setVendorName(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Vendor Code" 
                                        variant="standard" 
                                        value={vendorCode}
                                        onChange={ e => setVendorCode(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Tin Num" 
                                        variant="standard" 
                                        value={tinNum}
                                        onChange={ e => setTinNum(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Address" 
                                        variant="standard" 
                                        value={address}
                                        onChange={ e => setAddress(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Building Name" 
                                        variant="standard" 
                                        value={bldg}
                                        onChange={ e => setBldg(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <label className="form-label">City</label>
                                      <Select 
                                          value={city}
                                          options={cityArr} 
                                          onChange={ (val) => setCity(val)}
                                          isDisabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Contact Person" 
                                        variant="standard" 
                                        value={contactPerson}
                                        onChange={ e => setContactPerson(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Contact #" 
                                        variant="standard" 
                                        value={contactNum}
                                        onChange={ e => setContactNum(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="KAM" 
                                        variant="standard" 
                                        value={kam}
                                        onChange={ e => setKam(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <label className="form-label">Tier</label>
                                      <Select 
                                          value={tier}
                                          options={tierArr} 
                                          onChange={ (val) => setTier(val)}
                                          isDisabled={disableForm}
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
                                          isDisabled={disableForm}
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
                                          isDisabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <label className="form-label">SOA Type</label>
                                      <Select 
                                          value={soa}
                                          options={soaTypeArr} 
                                          onChange={ (val) => setSoa(val)}
                                          isDisabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Bank Details" 
                                        variant="standard" 
                                        multiline
                                        maxRows={4}
                                        value={bankDetail}
                                        onChange={ e => setBankDetail(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
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
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Moa Duration" 
                                        variant="standard" 
                                        value={moaDuration}
                                        onChange={ e => setMoaDuration(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Moa Status" 
                                        variant="standard"
                                        value={moaStatus}
                                        onChange={ e => setMoaStatus(e.target.value) }
                                        disabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                  <ListItem divider='true' alignItems="flex-start">
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <TextField 
                                        label="Terms" 
                                        variant="standard" 
                                        value={terms}
                                        onChange={ e => setTerms(e.target.value) }
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
                                      />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                      <label className="form-label">Sky Contact</label>
                                      <Select 
                                          value={skyContactId}
                                          options={skyContactArr} 
                                          onChange={ (val) => setSkyContactId(val) }
                                          isDisabled={disableForm}
                                      />
                                    </FormControl>
                                  </ListItem>
                                </List>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}


export default Update