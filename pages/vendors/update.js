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

const Update = () => {

    const router = useRouter();

    const recordId = router.query.id;

    const [cityArr,setCityArr] = useState([]);
    const [tierArr,setTierArr] = useState([]);
    const [accountArr,setAccountArr] = useState([]);
    const [accountTypeArr,setAccountTypeArr] = useState([]);
    const [paymentTermsArr,setPaymentTermsArr] = useState([]);
    const [soaTypeArr,setSoaTypeArr] = useState([]);

    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [btnDisabled,setBtnDisabled] = useState(false);

    const [vendorName, setVendorName] = useState('');
    const [vendorCode, setVendorCode] = useState('');
    const [bldg, setBldg] = useState('');
    const [city, setCity] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [kam, setKam] = useState('');
    const [tier, setTier] = useState('');
    const [account, setAccount] = useState('');
    const [accountType, setAccountType] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [soa, setSoa] = useState('');
    

    useEffect(() => {

        // console.log(recordId)
        
        let settingData = true;
        
        axios.post('/api/getVendorDetails', {
            id: recordId
        })
        .then( (res) => {

            // console.log(res.data[0])
            
            if(settingData){
                // setVendorDetails(res.data[0]);
                setVendorName(res.data[0].vendor_name)
                setVendorCode(res.data[0].vendor_code)
                setBldg(res.data[0].bldg_name)
                setContactPerson(res.data[0].contact_person)
                setContactNum(res.data[0].contact_num)
                setKam(res.data[0].kam)
                setCity({'value':res.data[0].city, 'label':res.data[0].city})
                setTier({'value':res.data[0].tier_segment, 'label':res.data[0].tier_segment})
                setAccount({'value':res.data[0].account, 'label':res.data[0].account})
                setAccountType({'value':res.data[0].account_type, 'label':res.data[0].account_type})
                setPaymentTerms({'value':res.data[0].payment_terms, 'label':res.data[0].payment_terms})
                setSoa({'value':res.data[0].soa_type, 'label':res.data[0].soa_type})
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
            setContactPerson('');
            setContactNum('');
            setKam('');
            setTier('');
            setAccount('');
            setAccountType('');
            setPaymentTerms('');
            setSoa('');
        }

    }, [recordId]);

    useEffect(() => {

        const getCityArr = async () => {

            const result = await axios.get('/api/getCityList');

            setCityArr(result.data);
        };

        const getTierArr = async () => {

            const result = await axios.get('/api/getTierList');

            setTierArr(result.data);
        };

        const getAccountArr = async () => {

            const result = await axios.get('/api/getAccountList');

            setAccountArr(result.data);
        };

        const getAccountTypeArr = async () => {

            const result = await axios.get('/api/getAccountTypeList');

            setAccountTypeArr(result.data);
        };

        const getPaymentTermsArr = async () => {

            const result = await axios.get('/api/getPaymentTermList');

            setPaymentTermsArr(result.data);
        };

        const getSoaTypeArr = async () => {

            const result = await axios.get('/api/getSoaTypeList');

            setSoaTypeArr(result.data);
        };

        getCityArr();
        getTierArr();
        getAccountArr();
        getAccountTypeArr();
        getPaymentTermsArr();
        getSoaTypeArr();

        return () => {
            setCityArr([]);
            setTierArr([]);
            setAccountArr([]);
            setAccountTypeArr([]);
            setPaymentTermsArr([]);
            setSoaTypeArr([]);
        }

    }, []);


    const [disableForm,SetDisableForm] = useState(false);

    const handleVendorName = (e) => {
        setVendorName(e.target.value);
    }

    const handleVendorCode = (e) => {
        setVendorCode(e.target.value);
    }

    const handleBldg = (e) => {
        setBldg(e.target.value);
    }

    const handleContactPerson = (e) => {
        setContactPerson(e.target.value);
    }

    const handleContactNum = (e) => {
        setContactNum(e.target.value);
    }

    const handleKam = (e) => {
        setKam(e.target.value);
    }

    const handleCity = (val) => {
        setCity(val);
    }

    const handleTier = (val) => {
        setTier(val);
    }

    const handleAccount = (val) => {
        setAccount(val);
    }

    const handleAccountType = (val) => {
        setAccountType(val);
    }

    const handlePaymentTerms = (val) => {
        setPaymentTerms(val);
    }

    const handleSoa = (val) => {
        setSoa(val);
    }
    

    const submitData = async (event) => {
        event.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);
        SetDisableForm(true)

        const data = {
            id: recordId,
            vendor_name: vendorName,
            vendor_code: vendorCode,
            bldg_name: bldg,
            city: city.value,
            contact_person: contactPerson,
            contact_num: contactNum,
            kam: kam,
            tier: tier.value,
            account: account.value,
            account_type: accountType.value,
            payment_terms: paymentTerms.value,
            soa_type: soa.value
        }

        // console.log(data);

        // API endpoint where we send form data.
        const url = '/api/updateVendor'

        await axios.post(url, data)
        .then( res => {

            // console.log(res);

            if(res.status === 200){

                toast.success('Vendor has been updated', {
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
                    console.log(v)
                    if(v.status === "removed"){
                        router.push("/vendors")
                    }
                });
            }  
            else{

                setSubmitBtn('Submit');
                setBtnDisabled(false);
                SetDisableForm(false)

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
            SetDisableForm(false)

            // console.log(err)

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
                            <h4></h4>

                            <form onSubmit={submitData} className="card">
                                <div className="card-body">
                                    <div className="card-title">Update vendor {recordId}</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Name</label>
                                                <input 
                                                    type="text" 
                                                    id="vendor_name" 
                                                    className="form-control"
                                                    value={vendorName}
                                                    onChange={handleVendorName}
                                                    disabled={disableForm}
                                                     /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Code</label>
                                                <input 
                                                    type="text" 
                                                    id="vendor_code" 
                                                    className="form-control" 
                                                    value={vendorCode}
                                                    onChange={handleVendorCode}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Building Name</label>
                                                <input 
                                                    type="text" 
                                                    id="bldg_name" 
                                                    className="form-control" 
                                                    value={bldg}
                                                    onChange={handleBldg}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <Select 
                                                    value={city}
                                                    options={cityArr} 
                                                    onChange={handleCity}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact Person</label>
                                                <input 
                                                    type="text" 
                                                    id="contact_person" 
                                                    className="form-control" 
                                                    value={contactPerson}
                                                    onChange={handleContactPerson}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact #</label>
                                                <input 
                                                    type="text" 
                                                    id="contact_num" 
                                                    className="form-control" 
                                                    value={contactNum}
                                                    onChange={handleContactNum}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">KAM</label>
                                                <input 
                                                    type="text" 
                                                    id="kam" 
                                                    className="form-control" 
                                                    value={kam}
                                                    onChange={handleKam}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tier</label>
                                                <Select 
                                                    value={tier}
                                                    options={tierArr} 
                                                    onChange={handleTier}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account</label>
                                                <Select 
                                                    value={account}
                                                    options={accountArr} 
                                                    onChange={handleAccount}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account Type</label>
                                                <Select 
                                                    value={accountType}
                                                    options={accountTypeArr} 
                                                    onChange={handleAccountType}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Payment Terms</label>
                                                <Select 
                                                    value={paymentTerms}
                                                    options={paymentTermsArr} 
                                                    onChange={handlePaymentTerms}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">SOA Type</label>
                                                <Select 
                                                    value={soa}
                                                    options={soaTypeArr} 
                                                    onChange={handleSoa}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{submitBtn}</button>
                                        <button type="button" className="btn btn-danger" disabled={btnDisabled} onClick={()=>router.push('/vendors')}>Cancel</button>
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


export default Update