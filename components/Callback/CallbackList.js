import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AttachmentIcon from '@mui/icons-material/Attachment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CallbackTable = (props) => {

  const [callbackDetailsArr,setCallbackDetailsArr] = useState([]);

  const getCallbackArr = async (callbackId) => {

    await axios.post('/api/callback_request/getCallbackDetails',{
      id: callbackId
    })
    .then( result => {
      setCallbackDetailsArr(result.data);

      // props.listCallback({
      //   listCount: result.data.length
      // });
    })
    .catch( err => {
      toast.error('Error '+err+'. Please try again.', {
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
  };

  const dateViewFormat = date => {
    date = date ? moment(date).format('M/DD/YYYY') : 'n/a';
    return date;
  }

  const ahtFormat = aht => {
    return aht.slice(0,-3);
  }

  const dateTimeViewFormat = date => {
    date = date ? moment(date).format('M/DD/YYYY HH:mm') : 'n/a';
    return date;
  }

  useEffect(() => {

    // console.log(props);

    if(props.callbackId){
      // console.log("from CallbackList.js");
      getCallbackArr(props.callbackId);
    }

    return () => {
      setCallbackDetailsArr([]);
    }

  }, [props.callbackId]);

  return (
    <>
      <Table sx={{ maxWidth: 1800 }} size="small" aria-label="simple table" variant="head">
        <TableHead sx={{backgroundColor:'wheat'}}>
          <TableRow>
            {/* <TableCell align="left">Action</TableCell> */}
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Start</TableCell>
            <TableCell align="left">End</TableCell>
            <TableCell align="left">AHT</TableCell>
            <TableCell align="left">Attempt Count</TableCell>
            <TableCell align="left" sx={{ width: 400 }}>Remarks</TableCell>
            <TableCell align="left">Preferred Date</TableCell>
            <TableCell align="left">Agent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {callbackDetailsArr.map((row) => (
            
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell align="left">
                <IconButton onClick={ () => updateActivity(row) }>
                  <EditIcon />
                </IconButton>  
              </TableCell> */}

              <TableCell align="left">{row.callback_status}</TableCell>
              <TableCell align="left">{dateTimeViewFormat(row.start)}</TableCell>
              <TableCell align="left">{dateTimeViewFormat(row.end)}</TableCell>
              <TableCell align="left">{ahtFormat(row.aht)}</TableCell>
              <TableCell align="left">{row.attempt_count}</TableCell>
              <TableCell align="left">{row.remarks}</TableCell>
              <TableCell align="left">{dateViewFormat(row.preferred_date)}</TableCell>
              <TableCell align="left">{row.agent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <UpdateActivity openUpdateModal={openModal} modalFunction={modalCallback} /> */}
    </>
    // </TableContainer>
  );
}

export default CallbackTable