import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import {
  List,ListItem,ListItemText,Divider,Grid,Typography,styled
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
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

  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '75%' }} align="center" size="small" aria-label="RFP">
          <TableBody>
            {/* 1ST ROW */}
            <TableRow>
              <TableCell sx={{ border:'none',width:200 }} align="left">
                <Img alt="complex" src="/sky_logo.png" />
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left">
                <Typography variant="subtitle2" gutterBottom>SKY CABLE CORPORATION AND SUBSIDIARIES</Typography>
                <Typography variant="subtitle2" gutterBottom>6F, ELJ Building, Mother Ignacia St., Cor., Sgt. Esguerra St., Quezon City</Typography>
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left">
                <Typography variant="subtitle2" gutterBottom>UTILITIES - RUSH</Typography>
                <Typography variant="subtitle2" gutterBottom>PLS. DO NOT DELAY</Typography>
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left">
                <Typography variant="subtitle2" gutterBottom>Form: RFP</Typography>
              </TableCell>
            </TableRow>
            {/* 2ND ROW */}
            <TableRow>
              <TableCell sx={{ border:'none', width:200 }} align="left">
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left">
                <Typography variant="subtitle2" gutterBottom>Company Code: {rfpData.vendor_code} </Typography>
                <Typography variant="subtitle2" gutterBottom>Document Date: {moment().format('MMM DD, YYYY')}</Typography>
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={2}>
                <Typography variant="subtitle2" gutterBottom>Urgent: Y </Typography>
                <Typography variant="subtitle2" gutterBottom>Reason for URGENCY: </Typography>
                <Typography variant="subtitle2" gutterBottom>Document Type: REQUEST FOR PAYMENT </Typography>
              </TableCell>
            </TableRow>
            {/* VENDOR INFORMATION HEADER */}
            <TableRow>
              <TableCell sx={{ border:'none', width:200 }} align="left" colSpan={4}>
                <Typography variant="subtitle1" gutterBottom>VENDOR INFORMATION</Typography>
              </TableCell>
            </TableRow>
            {/* VENDOR INFORMATION DETAILS */}
            <TableRow>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={3}>
                <Table sx={{ padding: 0, minWidth: 650  }} size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="right">
                        <Typography variant="subtitle2" gutterBottom>Vendor Code:&nbsp;&nbsp;</Typography>
                      </TableCell>
                      <TableCell sx={{ border:'none', padding: '0px'}} align="left" colSpan={3}>
                        <Typography variant="subtitle2" gutterBottom>{rfpData.vendor_code}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="right">
                        <Typography variant="subtitle2" gutterBottom>Vendor Name:&nbsp;&nbsp;</Typography>
                      </TableCell>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="left" colSpan={3}>
                        <Typography variant="h5" gutterBottom>{rfpData.vendor_name}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="right">
                        <Typography variant="subtitle2" gutterBottom>Address:&nbsp;&nbsp;</Typography>
                      </TableCell>
                      <TableCell sx={{ border:'none', padding: '0px'}} align="left" colSpan={3}>
                        <Typography variant="subtitle2" gutterBottom>{rfpData.address}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="right">
                        <Typography variant="subtitle2" gutterBottom>Phone:&nbsp;&nbsp;</Typography>
                      </TableCell>
                      <TableCell sx={{ border:'none', padding: '0px'}} align="left" colSpan={3}>
                        <Typography variant="subtitle2" gutterBottom>{rfpData.contact_num}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border:'none', width:300, padding: '0px'}} align="right">
                        <Typography variant="subtitle2" gutterBottom>TIN:&nbsp;&nbsp;</Typography>
                      </TableCell>
                      <TableCell sx={{ border:'none', padding: '0px'}} align="left" colSpan={3}>
                        <Typography variant="subtitle2" gutterBottom>{rfpData.tin_num}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
            {/* REQUEST INFORMATION HEADER */}
            <TableRow>
              <TableCell sx={{ border:'none', width:200 }} align="left" colSpan={4}>
                <Typography variant="subtitle1" gutterBottom>REQUEST INFORMATION</Typography>
              </TableCell>
            </TableRow>
            {/* REQUEST INFORMATION DETAILS */}
            <TableRow>
              <TableCell sx={{ border:'none', width:200 }} align="left">
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left">
                <Typography variant="subtitle2" gutterBottom>Division/Subsidiary: NETWORK OPERATIONS </Typography>
                <Typography variant="subtitle2" gutterBottom>Division/Subsidiary ID:  </Typography>
                <Typography variant="subtitle2" gutterBottom>Payment Method: CHEQUE </Typography>
                <Typography variant="subtitle2" gutterBottom>Description: </Typography>
              </TableCell>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={2}>
                <Typography variant="subtitle2" gutterBottom>Contact Person: {rfpData.contact_person} </Typography>
                <Typography variant="subtitle2" gutterBottom>Phone:  {rfpData.contact_number} </Typography>
                <Typography variant="subtitle2" gutterBottom>Email: {rfpData.email_add} </Typography><br/><br/>
                <Typography variant="h5" gutterBottom>TOTAL AMOUNT: {numFormat(rfpData.total_amount)} </Typography>
              </TableCell>
            </TableRow>
            {/* BREAKDOWN DETAILS */}
            <TableRow>
              <TableCell sx={{ border:'none' }} align="left" colSpan={5}>
                <Table sx={{ border:'1px solid black' }}>
                  <TableBody>
                    <TableRow 
                      sx={{
                        borderBottom: "1px solid black",
                        "& th": {
                          fontSize: "1.25rem",
                          color: "rgba(96, 96, 96)"
                        }
                      }}
                    >
                      <TableCell sx={customCell(400,1)} align="center">GL Account</TableCell>
                      <TableCell sx={customCell(100,1)} align="center">D/C</TableCell>
                      <TableCell sx={customCell(100,1)} align="center">Cost Center</TableCell>
                      <TableCell sx={customCell(100,1)} align="center">Internal Order</TableCell>
                      <TableCell sx={customCell(100,1)} align="center">Assignment</TableCell>
                      <TableCell sx={customCell(100,1)} align="center">Tax</TableCell>
                      <TableCell sx={customCell(200,1)} align="center">Amount</TableCell>
                      <TableCell sx={customCell(400,1)} align="center">Text</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={customCell(400)} align="left">Electric bill of Condominium</TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left">{rfpData.internal_order1}</TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(200)} align="left"></TableCell>
                      <TableCell sx={customCell(400)} align="left"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={customCell(400)} align="left">{rfpData.vendor_name}</TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left">{rfpData.internal_order1}</TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(200)} align="left"></TableCell>
                      <TableCell sx={customCell(400)} align="left"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={customCell(400)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(100)} align="left"></TableCell>
                      <TableCell sx={customCell(200)} align="left">
                        <Typography variant="subtitle2">₱ {numFormat(rfpData.total_amount)}</Typography>
                      </TableCell>
                      <TableCell sx={customCell(400)} align="left"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
            {/* 8TH ROW */}
            <TableRow>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border:'none'}}>Prepared by:</TableCell>
                      <TableCell sx={{ border:'none'}}>Recommending Approval (DEPT / DIV HEAD):</TableCell>
                      <TableCell sx={{ border:'none'}}>Approved by:</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="subtitle2" sx={{borderBottom:'1px solid black'}}></Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" sx={{borderBottom:'1px solid black'}}></Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" sx={{borderBottom:'1px solid black'}}></Typography></TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableCell>

            </TableRow>
            {/* 9TH ROW */}
            <TableRow>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={4}>
                <Typography variant="subtitle2" gutterBottom>
                      Remarks: Submitted Original SOA for the period of {period}
                </Typography>
              </TableCell>
            </TableRow>
            {/* 10TH ROW */}
            <TableRow>
              <TableCell sx={{ border:'none', verticalAlign:'top' }} align="left" colSpan={4}>
                <Typography variant="h5" gutterBottom>
                  VAT EXEMPT AS PER TRAIN LAW..ATTACHED TRAIN LAW NOTICE
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default Create