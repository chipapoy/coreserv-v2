import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import moment from 'moment';
import {
  List,ListItem,ListItemText,Divider,Grid,Typography,styled
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Create = () => {

  const router = useRouter();

  const { viewRfpId } = router.query;

  const pageTitle = 'Update RFP';

  const [rfpData,setRfpData] = useState([]);

  const [displayTab,setDisplayTab] = useState({
    display: 'inline-flex',
    disabled: false
  });

  const getRfpDetails = async (viewRfpId) => {

    console.log('function called');

    await axios.post('/api/rfp_request/getRfpDetails',{
      id : viewRfpId
    })
    .then( (result) => {
      setRfpData(result.data);
    })
    .catch( (err) => {
      console.log(err)
      setRfpData([])
    });
  };

  useEffect(() => {
    
    getRfpDetails(viewRfpId);

    return () => {
      console.log('Unmount');
      setRfpData([]);
    }

  }, [viewRfpId]);

  const period = moment(rfpData.bill_period_from).format('MMM DD, YYYY') + ' - ' + moment(rfpData.bill_period_to).format('MMM DD, YYYY');

  const Img = styled('img')({
    marginRight: 100,
    padding: 0,
  });

  // const [customCell,setCustomCell] = useState({
  //   border:'none',
  //   width:400,
  //   border: "1px solid black"
  // });

  const customCell = (width,border=0) => ({
    border: border!==0 ? "1px solid black" : "none",
    width: width
  });

  const numFormat = (val) => {
    const num = parseFloat(val);
    return num.toLocaleString();
  }

  const ElectricalForm = () => {

    return (
      <>
        <table className="table table-sm table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <th width="200" rowSpan={2}>
                <Img alt="complex" src="/sky_logo.png" />
              </th>
              <td class="align-bottom"><h5>SKY CABLE CORPORATION AND SUBSIDIARIES</h5></td>
              <td class="align-bottom">RENTAL & UTILITIES - RUSH</td>
              <td class="align-bottom">Form: RFP</td>
            </tr>
            <tr>
              <td class="align-top">6F, ELJ Building, Mother Ignacia St., Cor., Sgt. Esguerra St., Quezon City</td>
              <td class="align-top">PLS. DO NOT DELAY</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Company Code: {rfpData.vendor_code}</td>
              <td>Urgent: Y</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Document Date: {moment().format('MMM DD, YYYY')}</td>
              <td>Reason for URGENCY:</td>
              <td></td>
            </tr>
          {/* VENDOR INFORMATION DETAILS */}
            <tr>
              <td scope="row" colSpan={3}>VENDOR INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vedor Code: {rfpData.vendor_code}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vendor Name: <span class="fs-3">{rfpData.vendor_name}</span></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Address: {rfpData.address}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Phone: {rfpData.contact_num}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>TIN: {rfpData.tin_num}</td>
            </tr>
          {/* REQUEST INFORMATION HEADER */}
            <tr>
              <td scope="row" colSpan={3}>REQUEST INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary: NETWORK OPERATIONS </td>
              <td>Contact Person: {rfpData.contact_person} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary ID: </td>
              <td>Phone:  {rfpData.contact_number} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Payment Method: CHEQUE </td>
              <td>Email: {rfpData.email_add} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Description: </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td></td>
              <td colSpan={2}><span class="fs-3">TOTAL AMOUNT: {numFormat(rfpData.total_amount)}</span> </td>
            </tr>
          </tbody>
        </table>
        {/* BREAKDOWN DETAILS */}
        <table className="table table-bordered" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td>GL Account</td>
              <td>D/C</td>
              <td>Cost Center</td>
              <td>Internal Order</td>
              <td>Assignment</td>
              <td>Tax</td>
              <td>Amount</td>
              <td>Text</td>
            </tr>
            <tr>
              <td>{rfpData.vendor_name}</td>
              <td></td>
              <td></td>
              <td>{rfpData.internal_order1}</td>
              <td></td>
              <td></td>
              <td>₱ {numFormat(rfpData.total_amount)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {/* FOOTER */}
        <table className="table table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td scope="row">Prepared by:</td>
              <td>Recommending Approval (DEPT / DIV HEAD):</td>
              <td>Approved by:</td>
            </tr>
            <tr>
              <td scope="row"><hr width="80%" /></td>
              <td><hr width="80%" /></td>
              <td><hr width="80%" /></td>
            </tr>
            <tr>
              <td colSpan={4}>Remarks: Submitted Original SOA for the period of {period}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span class="fs-4">VAT EXEMPT AS PER TRAIN LAW..ATTACHED TRAIN LAW NOTICE</span>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  const RentForm = () => {

    return (
      <>
        <table className="table table-sm table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <th width="200" rowSpan={2}>
                <Img alt="complex" src="/sky_logo.png" />
              </th>
              <td class="align-bottom"><h5>SKY CABLE CORPORATION AND SUBSIDIARIES</h5></td>
              <td class="align-bottom">RENTAL & UTILITIES - RUSH</td>
              <td class="align-bottom">Form: RFP</td>
            </tr>
            <tr>
              <td class="align-top">6F, ELJ Building, Mother Ignacia St., Cor., Sgt. Esguerra St., Quezon City</td>
              <td class="align-top">PLS. DO NOT DELAY</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Company Code: {rfpData.vendor_code}</td>
              <td>Urgent: Y</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Document Date: {moment().format('MMM DD, YYYY')}</td>
              <td>Reason for URGENCY:</td>
              <td></td>
            </tr>
          {/* VENDOR INFORMATION DETAILS */}
            <tr>
              <td scope="row" colSpan={3}>VENDOR INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vedor Code: {rfpData.vendor_code}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vendor Name: <span class="fs-3">{rfpData.vendor_name}</span></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Address: {rfpData.address}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Phone: {rfpData.contact_num}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>TIN: {rfpData.tin_num}</td>
            </tr>
          {/* REQUEST INFORMATION HEADER */}
            <tr>
              <td scope="row" colSpan={3}>REQUEST INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary: NETWORK OPERATIONS </td>
              <td>Contact Person: {rfpData.contact_person} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary ID: </td>
              <td>Phone:  {rfpData.contact_number} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Payment Method: CHEQUE </td>
              <td>Email: {rfpData.email_add} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Description: </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td></td>
              <td colSpan={2}><span class="fs-3">TOTAL AMOUNT: {numFormat(rfpData.total_amount)}</span> </td>
            </tr>
          </tbody>
        </table>
        {/* BREAKDOWN DETAILS */}
        <table className="table table-bordered" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td>GL Account</td>
              <td>D/C</td>
              <td>Cost Center</td>
              <td>Internal Order</td>
              <td>Assignment</td>
              <td>Tax</td>
              <td>Amount</td>
              <td>Text</td>
            </tr>
            <tr>
              <td>602130006 RENT & UTILITIES</td>
              <td></td>
              <td></td>
              <td>{rfpData.internal_order1}</td>
              <td></td>
              <td></td>
              <td>₱ {numFormat(rfpData.total_amount)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {/* FOOTER */}
        <table className="table table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td scope="row">Prepared by:</td>
              <td>Recommending Approval (DEPT / DIV HEAD):</td>
              <td>Approved by:</td>
            </tr>
            <tr>
              <td scope="row"><hr width="80%" /></td>
              <td><hr width="80%" /></td>
              <td><hr width="80%" /></td>
            </tr>
            <tr>
              <td colSpan={4}>Remarks: Submitted Original SOA for the period of {period}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span class="fs-4">VAT EXEMPT AS PER TRAIN LAW..ATTACHED TRAIN LAW NOTICE</span>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  const Test = () => {

    return (
      <>
        <table className="table table-sm table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <th width="200" rowSpan={2}>
                <Img alt="complex" src="/sky_logo.png" />
              </th>
              <td class="align-bottom"><h5>SKY CABLE CORPORATION AND SUBSIDIARIES</h5></td>
              <td class="align-bottom">RENTAL & UTILITIES - RUSH</td>
              <td class="align-bottom">Form: RFP</td>
            </tr>
            <tr>
              <td class="align-top">6F, ELJ Building, Mother Ignacia St., Cor., Sgt. Esguerra St., Quezon City</td>
              <td class="align-top">PLS. DO NOT DELAY</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Company Code: {rfpData.vendor_code}</td>
              <td>Urgent: Y</td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Document Date: {moment().format('MMM DD, YYYY')}</td>
              <td>Reason for URGENCY:</td>
              <td></td>
            </tr>
          {/* VENDOR INFORMATION DETAILS */}
            <tr>
              <td scope="row" colSpan={3}>VENDOR INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vedor Code: {rfpData.vendor_code}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Vendor Name: <span class="fs-3">{rfpData.vendor_name}</span></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Address: {rfpData.address}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>Phone: {rfpData.contact_num}</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td colSpan={3}>TIN: {rfpData.tin_num}</td>
            </tr>
          {/* REQUEST INFORMATION HEADER */}
            <tr>
              <td scope="row" colSpan={3}>REQUEST INFORMATION</td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary: NETWORK OPERATIONS </td>
              <td>Contact Person: {rfpData.contact_person} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Division/Subsidiary ID: </td>
              <td>Phone:  {rfpData.contact_number} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Payment Method: CHEQUE </td>
              <td>Email: {rfpData.email_add} </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td>Description: </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td scope="row"></td>
              <td></td>
              <td colSpan={2}><span class="fs-3">TOTAL AMOUNT: {numFormat(rfpData.total_amount)}</span> </td>
            </tr>
          </tbody>
        </table>
        {/* BREAKDOWN DETAILS */}
        <table className="table table-bordered" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td>GL Account</td>
              <td>D/C</td>
              <td>Cost Center</td>
              <td>Internal Order</td>
              <td>Assignment</td>
              <td>Tax</td>
              <td>Amount</td>
              <td>Text</td>
            </tr>
            <tr>
              <td>602130006 RENT & UTILITIES</td>
              <td></td>
              <td></td>
              <td>{rfpData.internal_order1}</td>
              <td></td>
              <td></td>
              <td>₱ {numFormat(rfpData.total_amount)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {/* FOOTER */}
        <table className="table table-borderless" style={{ maxWidth:'75%' }} align="center">
          <tbody>
            <tr>
              <td scope="row">Prepared by:</td>
              <td>Recommending Approval (DEPT / DIV HEAD):</td>
              <td>Approved by:</td>
            </tr>
            <tr>
              <td scope="row"><hr width="80%" /></td>
              <td><hr width="80%" /></td>
              <td><hr width="80%" /></td>
            </tr>
            <tr>
              <td colSpan={4}>Remarks: Submitted Original SOA for the period of {period}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span class="fs-4">VAT EXEMPT AS PER TRAIN LAW..ATTACHED TRAIN LAW NOTICE</span>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );

  }
  

  
  return rfpData.rfp_type == "Electrical" ? <ElectricalForm /> : <RentForm />
}


export default Create