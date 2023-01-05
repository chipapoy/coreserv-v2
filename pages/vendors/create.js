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

const Create = () => {

    const router = useRouter();

    const [cityArr,setCityArr] = useState([]);
    const [tierArr,setTierArr] = useState([]);
    const [accountArr,setAccountArr] = useState([]);
    const [accountTypeArr,setAccountTypeArr] = useState([]);
    const [paymentTermsArr,setPaymentTermsArr] = useState([]);
    const [soaTypeArr,setSoaTypeArr] = useState([]);

    const [submitBtn,setSubmitBtn] = useState([]);

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

    const submitData = async (event) => {
        event.preventDefault();

        const data = {
            vendor_name: event.target.vendor_name.value,
            vendor_code: event.target.vendor_code.value,
            bldg_name: event.target.bldg_name.value,
            city: event.target.city.value,
            contact_person: event.target.contact_person.value,
            contact_num: event.target.contact_num.value,
            kam: event.target.kam.value,
            tier: event.target.tier.value,
            account: event.target.account.value,
            account_type: event.target.account_type.value,
            payment_terms: event.target.payment_terms.value,
            soa_type: event.target.soa_type.value
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const url = '/api/createVendor'

        axios.post(url, data)
        .then( res => {

            console.log(res);

            if(res.status === 200){
                toast.success('New Vendor Added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });

                router.push("/vendors");
            }

        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>Coreserv</title>
            </Head>
            <div id="main_content">

                <Sidemenu></Sidemenu>
                <ToastContainer />
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
                                                <input type="text" id="vendor_name" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Code</label>
                                                <input type="text" id="vendor_code" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Building Name</label>
                                                <input type="text" id="bldg_name" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <select
                                                    id='city'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        cityArr.map( (data,index) => {
                                                            return <option key={index}>{data.city}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact Person</label>
                                                <input type="text" id="contact_person" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Contact #</label>
                                                <input type="text" id="contact_num" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">KAM</label>
                                                <input type="text" id="kam" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tier</label>
                                                <select
                                                    id='tier'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        tierArr.map( (data,index) => {
                                                            return <option key={index}>{data.tier}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account</label>
                                                <select
                                                    id='account'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        accountArr.map( (data,index) => {
                                                            return <option key={index}>{data.account}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Account Type</label>
                                                <select
                                                    id='account_type'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        accountTypeArr.map( (data,index) => {
                                                            return <option key={index}>{data.account_type}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Payment Terms</label>
                                                <select
                                                    id='payment_terms'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        paymentTermsArr.map( (data,index) => {
                                                            return <option key={index}>{data.terms}</option>
                                                        })
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">SOA Type</label>
                                                <select
                                                    id='soa_type'
                                                    className='form-control'
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        soaTypeArr.map( (data,index) => {
                                                            return <option key={index}>{data.soa_type}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary">{submitBtn}</button>
                                        <button type="button" className="btn btn-danger">Cancel</button>
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