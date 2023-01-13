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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const Create = () => {

    const router = useRouter();

    const recordId = router.query.id;

    const pageTitle = 'Request For Payment'

    const [vendorArr,setVendorArr] = useState([]);
    const [skyContactArr,setSkyContactArr] = useState([]);

    const [vendor, setVendor] = useState('');
    const [vendorDetails, setVendorDetails] = useState('');
    const [skyContact, setSkyContact] = useState('');
    const [internalOrder1, setInternalOrder1] = useState('');
    const [internalOrder2, setInternalOrder2] = useState('');

    const [billFrom, setBillFrom] = useState(new Date());
    const [billTo, setBillTo] = useState(new Date());

    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [btnDisabled,setBtnDisabled] = useState(false);

    useEffect(() => {
        
        let settingData = true;
        
        axios.post('/api/getRfpDetails', {
            id: recordId
        })
        .then( (res) => {

            if(settingData){

                console.log(res.data)
                setVendor({'value':res.data[0].vendor_id, 'label':res.data[0].vendor_name})
                setSkyContact({
                    'value':res.data[0].sky_contact_id, 
                    'label':res.data[0].contact_person,
                    'contact_number':res.data[0].contact_number,
                    'email_add':res.data[0].email_add
                });
                setVendorDetails(res.data[0])
                setInternalOrder1(res.data[0].internal_order1)
                setInternalOrder2(res.data[0].internal_order2)
                // setVendorCode(res.data[0].vendor_code)
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
            // setVendorName('');
            // setVendorCode('');
        }

    }, [recordId]);

    useEffect(() => {

        const getVendorArr = async () => {

            const result = await axios.get('/api/getVendorNameList');

            setVendorArr(result.data);
        };

        const getSkyContactArr = async () => {

          const result = await axios.get('/api/getSkyContactDetails');

          setSkyContactArr(result.data);
      };

        getVendorArr();
        getSkyContactArr();

        return () => {
            setVendorArr([]);
            getSkyContactArr([]);
        }

    }, []);

    const [disableForm,SetDisableForm] = useState(false);

    const handleVendorName = (val) => {
        setVendor(val);

        console.log(val)

        const getVendorDetails = async () => {

            const result = await axios.post('/api/getVendorDetails',{
              id: val.value
            })
            .then( (res) => {

            //   setVendorDetails(res.data);

            //   console.log(res.data)

            })
            .catch( (err) => {

            });
        };

        getVendorDetails();
    }

    const handleSkyContactDetails = (val) => {
        // console.log(val.contact_number)
        setSkyContact(val);
    }

    const handleInternalOrder1 = (e) => {
      setInternalOrder1(e.target.value);
    }

    const handleInternalOrder2 = (e) => {
        setInternalOrder2(e.target.value);
    }

    

    const submitData = async (event) => {
        event.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);
        SetDisableForm(true);

        const data = {
            id: recordId,
            bill_period_from: moment(billFrom).format('YYYY-MM-DD'),
            bill_period_to: moment(billTo).format('YYYY-MM-DD')
        }
        
        console.log(data)

        // API endpoint where we send form data.
        const url = '/api/requestPayment'

        await axios.post(url, data)
        .then( res => {

            // console.log(res);

            if(res.status === 200){

                toast.success('Request Payment has been created', {
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
                        router.push("/dashboard")
                    }
                });
            }  
            else{

                setSubmitBtn('Submit');
                setBtnDisabled(false);
                SetDisableForm(false);

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
            SetDisableForm(false);

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
                                    <div className="card-title">{pageTitle}</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div class="inline-editor">
                                                <label className="form-label">Vendor Details</label>
                                                <ul class="list-unstyled">
                                                    <li>Vendor: {vendor.label}</li>
                                                    <li>Bldg: {vendorDetails.bldg_name}</li>
                                                    <li>Contact#: {vendorDetails.contact_num}</li>
                                                    <li>Code: {vendorDetails.vendor_code}</li>
                                                    <li>Area: {vendorDetails.city}</li>
                                                    <li>System: {vendorDetails.account}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div class="inline-editor">
                                                <label className="form-label">Sky Contact Person</label>
                                                <ul class="list-unstyled">
                                                    <li><i class="fe fe-user"></i> {skyContact.label}</li>
                                                    <li><i class="fe fe-smartphone"></i> {skyContact.contact_number}</li>
                                                    <li><i class="fe fe-mail"></i> {skyContact.email_add}</li>
                                                </ul>
                                                <label className="form-label">Internal Order 1</label>
                                                <ul class="list-unstyled">
                                                    <li> {internalOrder1}</li>
                                                </ul>
                                                <label className="form-label">Internal Order 2</label>
                                                <ul class="list-unstyled">
                                                    <li> {internalOrder2}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Bill Period From</label>
                                                <DatePicker selected={billFrom} onChange={(date) => setBillFrom(date)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Bill Period To</label>
                                                <DatePicker selected={billTo} onChange={(date) => setBillTo(date)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{submitBtn}</button>
                                        <button type="button" className="btn btn-danger" disabled={btnDisabled} onClick={()=>router.push('/rfp')}>Cancel</button>
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