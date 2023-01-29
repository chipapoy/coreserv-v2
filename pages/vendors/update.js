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
    const pageTitle = "Update Record";
    const [recordId,setRecordId] = useState(router.query.id);

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
        
        axios.post('/api/getVendorDetails', {
            id: recordId
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

    const submitData = async (event) => {
        event.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);
        SetDisableForm(true)

        const data = {
            id: recordId,
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
            sky_contact_id: skyContactId.value
        }

        console.log(data);
        const url = '/api/updateVendor'

        await axios.post(url, data)
        .then( res => {
            
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
                                    <div className="card-title">{pageTitle}</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Name</label>
                                                <input 
                                                    type="text" 
                                                    id="vendor_name" 
                                                    className="form-control"
                                                    value={vendorName}
                                                    onChange={ (val) => setVendorName(val.target.value) }
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
                                                    onChange={ (val) => setVendorCode(val.target.value)}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tin Num</label>
                                                <input 
                                                    type="text" 
                                                    id="tin_num" 
                                                    className="form-control" 
                                                    value={tinNum}
                                                    onChange={ (val) => setTinNum(val.target.value)}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <input 
                                                    type="text" 
                                                    id="address" 
                                                    className="form-control" 
                                                    value={address}
                                                    onChange={ (val) => setAddress(val.target.value)}
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
                                                    onChange={ (val) => setBldg(val.target.value)}
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
                                                    onChange={ (val) => setCity(val)}
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
                                                    onChange={ (val) => setContactPerson(val.target.value)}
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
                                                    onChange={ (val) => setContactNum(val.target.value)}
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
                                                    onChange={ (val) => setKam(val.target.value)}
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
                                                    onChange={ (val) => setTier(val)}
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
                                                    onChange={ (val) => setAccount(val)}
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
                                                    onChange={ (val) => setAccountType(val)}
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
                                                    onChange={ (val) => setPaymentTerms(val)}
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
                                                    onChange={ (val) => setSoa(val)}
                                                    isDisabled={disableForm}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Bank Details</label>
                                                <input 
                                                    type="text" 
                                                    id="bankDetail" 
                                                    className="form-control" 
                                                    value={bankDetail}
                                                    onChange={ (val) => setBankDetail(val.target.value)}
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
                                                    value={remarks}
                                                    onChange={ (val) => setRemarks(val.target.value)}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Moa Duration</label>
                                                <input 
                                                    type="text" 
                                                    id="moaDuration" 
                                                    className="form-control" 
                                                    value={moaDuration}
                                                    onChange={ (val) => setMoaDuration(val.target.value)}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Moa Status</label>
                                                <input 
                                                    type="text" 
                                                    id="moaStatus" 
                                                    className="form-control" 
                                                    value={moaStatus}
                                                    onChange={ (val) => setMoaStatus(val.target.value)}
                                                    disabled={disableForm}
                                                    /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Terms</label>
                                                <input 
                                                    type="text" 
                                                    id="terms" 
                                                    className="form-control" 
                                                    value={terms}
                                                    onChange={ (val) => setTerms(val.target.value)}
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