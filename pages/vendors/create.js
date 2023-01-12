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

const Create = () => {

    const router = useRouter();

    const [cityArr,setCityArr] = useState([]);
    const [tierArr,setTierArr] = useState([]);
    const [accountArr,setAccountArr] = useState([]);
    const [accountTypeArr,setAccountTypeArr] = useState([]);
    const [paymentTermsArr,setPaymentTermsArr] = useState([]);
    const [soaTypeArr,setSoaTypeArr] = useState([]);

    const [city, setCity] = useState('');
    const [tier, setTier] = useState('');
    const [account, setAccount] = useState('');
    const [accountType, setAccountType] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [soa, setSoa] = useState('');

    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [btnDisabled,setBtnDisabled] = useState(false);



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

        const data = {
            vendor_name: event.target.vendor_name.value,
            vendor_code: event.target.vendor_code.value,
            bldg_name: event.target.bldg_name.value,
            city: city.value,
            contact_person: event.target.contact_person.value,
            contact_num: event.target.contact_num.value,
            kam: event.target.kam.value,
            tier: tier.value,
            account: account.value,
            account_type: accountType.value,
            payment_terms: paymentTerms.value,
            soa_type: soa.value
        }

        // API endpoint where we send form data.
        const url = '/api/createVendor'

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
                                    <div className="card-title">Create new vendor</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Name</label>
                                                <input type="text" id="vendor_name" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Code</label>
                                                <input type="text" id="vendor_code" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Building Name</label>
                                                <input type="text" id="bldg_name" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <Select 
                                                    value={city}
                                                    options={cityArr} 
                                                    onChange={handleCity}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact Person</label>
                                                <input type="text" id="contact_person" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact #</label>
                                                <input type="text" id="contact_num" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">KAM</label>
                                                <input type="text" id="kam" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tier</label>
                                                <Select 
                                                    value={tier}
                                                    options={tierArr} 
                                                    onChange={handleTier}
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


export default Create