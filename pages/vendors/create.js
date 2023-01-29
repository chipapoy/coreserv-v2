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

        const getSkyContactArr = async () => {

            const result = await axios.get('/api/getSkyContactDetails');
  
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
                            <h4></h4>

                            <form onSubmit={submitData} className="card">
                                <div className="card-body">
                                    <div className="card-title">Create new vendor</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Name</label>
                                                <input type="text" id="vendorName" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Code</label>
                                                <input type="text" id="vendorCode" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tin Num</label>
                                                <input 
                                                    id="tinNum" 
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <input 
                                                    id="address" 
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Building Name</label>
                                                <input type="text" id="bldg" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <Select 
                                                    value={city}
                                                    options={cityArr} 
                                                    onChange={ (val) => setCity(val)}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact Person</label>
                                                <input type="text" id="contactPerson" className="form-control" /*required*/ />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact #</label>
                                                <input type="text" id="contactNum" className="form-control" /*required*/ />
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
                                                    onChange={ (val) => setTier(val)}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account</label>
                                                <Select 
                                                    value={account}
                                                    options={accountArr} 
                                                    onChange={ (val) => setAccount(val)}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account Type</label>
                                                <Select 
                                                    value={accountType}
                                                    options={accountTypeArr} 
                                                    onChange={ (val) => setAccountType(val)}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Payment Terms</label>
                                                <Select 
                                                    value={paymentTerms}
                                                    options={paymentTermsArr} 
                                                    onChange={ (val) => setPaymentTerms(val)}
                                                    isClearable={true}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">SOA Type</label>
                                                <Select 
                                                    value={soa}
                                                    options={soaTypeArr} 
                                                    onChange={ (val) => setSoa(val)}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Bank Details</label>
                                                <input 
                                                    id="bankDetails"
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Remarks</label>
                                                <textarea 
                                                    id="remarks" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Moa Duration</label>
                                                <input 
                                                    id="moaDuration" 
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Moa Status</label>
                                                <input 
                                                    id="moaStatus" 
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Terms</label>
                                                <input  
                                                    id="terms"
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Auto Renewal</label>
                                                <Select 
                                                    value={autoRenew}
                                                    options={autoRenewSelection} 
                                                    onChange={ (val) => setAutoRenew(val) }
                                                    isDisabled={disableForm}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">With Penalty</label>
                                                <Select 
                                                    value={withPenalty}
                                                    options={withPenaltySelection} 
                                                    onChange={ (val) => setWithPenalty(val) }
                                                    isDisabled={disableForm}
                                                    isClearable={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Sky Contact</label>
                                                <Select 
                                                    value={skyContactId}
                                                    options={skyContactArr} 
                                                    onChange={ (val) => setSkyContactId(val) }
                                                    isDisabled={disableForm}
                                                    isClearable={true}
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