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

    const pageTitle = 'Create RFP'

    const [vendorArr,setVendorArr] = useState([]);
    const [skyContactArr,setSkyContactArr] = useState([]);

    const [vendor, setVendor] = useState('');
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

        getVendorArr();
        getSkyContactArr();

        return () => {
            setVendorArr([]);
            getSkyContactArr([]);
        }

    }, []);

    const handleVendorName = (val) => {
        setVendor(val);

        console.log(val)

        const getVendorDetails = async () => {

            const result = await axios.post('/api/getVendorDetails',{
              id: val.value
            })
            .then( (res) => {

              // setVendorArr(res.data);

              console.log(res.data)

            })
            .catch( (err) => {

            });
        };

        getVendorDetails();
    }

    const handleSkyContactDetails = (val) => {
        // console.log(val.contact_number)
        setSkyContact(val);
        setSkyContactNum(val.contact_num);
    }

    const handleSkyContactNum = (e) => {
      setSkyContactNum(e.target.value);
  }

    

    const submitData = async (event) => {
        event.preventDefault();

        setSubmitBtn('Processing');
        setBtnDisabled(true);

        const data = {
            vendor_id: vendor.value,
            sky_contact_id: skyContact.value,
            internal_order1: event.target.internal_order1.value,
            internal_order2: event.target.internal_order2.value,
        }
        
        console.log(data)

        // API endpoint where we send form data.
        const url = '/api/createRfp'

        await axios.post(url, data)
        .then( res => {

            // console.log(res);

            if(res.status === 200){

                toast.success('New RFP has been created', {
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
                        router.push("/rfp")
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
                                    <div className="card-title">{pageTitle}</div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Vendor Name</label>
                                                <Select 
                                                    value={vendor}
                                                    options={vendorArr} 
                                                    onChange={handleVendorName}
                                                />
                                            </div>
                                            <div class="inline-editor">
                                              <label className="form-label">Vendor Details</label>
                                              <ul class="list-unstyled">
                                                  <li>Bldg: {vendor.bldg_name}</li>
                                                  <li>Contact#: {vendor.contact_num}</li>
                                                  <li>Code: {vendor.vendor_code}</li>
                                                  <li>Area: {vendor.city}</li>
                                                  <li>System: {vendor.account}</li>
                                              </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Sky Contact Person</label>
                                                <Select 
                                                    // value={skyContact}
                                                    options={skyContactArr} 
                                                    onChange={handleSkyContactDetails}
                                                />
                                            </div>
                                            <div class="inline-editor">
                                              <label className="form-label">Contact Details</label>
                                              <ul class="list-unstyled">
                                                  <li><i class="fe fe-smartphone"></i> {skyContact.contact_number}</li>
                                                  <li><i class="fe fe-mail"></i> {skyContact.email_add}</li>
                                              </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Internal Order 1</label>
                                                <input 
                                                  id="internal_order1"
                                                  type="text" 
                                                  className="form-control"
                                                  /*required*/ 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Internal Order 2</label>
                                                <input 
                                                  id="internal_order2"
                                                  type="text" 
                                                  className="form-control"
                                                  /*required*/ 
                                                />
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