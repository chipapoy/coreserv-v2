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
import UpdateActivity from "../../components/Dispatch/UpdateActivity";

const CallbackTable = (props) => {

  const [callbackDetailsArr,setCallbackDetailsArr] = useState([]);
  const [openModal,setOpenModal] = useState({
    open:false,
    id:null
  });

  const [uploadModal,setUploadModal] = useState({
    open:false,
    type:null,
    id:null
  });

  const getActivityArr = async (dispId) => {

    await axios.post('/api/callback_request/getCallbackDetails',{
      id: dispId
    })
    .then( result => {
      setCallbackDetailsArr(result.data);

      props.listCallback({
        listCount: result.data.length
      });
    })
    .catch( err => {
      console.log(err)
    });
  };

  const dateViewFormat = date => {
    date = date ? moment(date).format('M/DD/YYYY') : 'n/a';
    return date;
  }

  const updateActivity = (data) => {
    // setOpenUpdateModal(true);
    setOpenModal({
      open:true,
      id:data.id
    });
  }

  const viewAttachment = (type,data) => {
    // setOpenUpdateModal(true);
    setUploadModal({
      open:true,
      type:type,
      id:data.id
    });
  }

  const modalCallback = (data) => {
    setOpenModal({
      open:data.open,
      id:null
    });
    // console.log(data);
    getActivityArr(props.dispId);

    props.updateCallback({
      open: data.open,
      cancel: data.cancel,
      update: data.update
    })
  }

  const uploadCallback = (data) => {
    setUploadModal({
      open:data.open,
      type:null,
      id:null
    });
    // console.log(data);
    // getActivityArr(props.dispId);
  }

  useEffect(() => {

    if(props){
      console.log("from ActivityList.js");

      getActivityArr(props.dispId);

      
    }
    

    return () => {
      setCallbackDetailsArr([]);
    }

  }, [props]);

  return (
    // <TableContainer component={Paper}>
    <>
      <Table sx={{ maxWidth: 1200 }} size="small" aria-label="simple table" variant="head">
        <TableHead sx={{backgroundColor:'wheat'}}>
          <TableRow>
            <TableCell align="left">Action</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Attempt Count</TableCell>
            <TableCell align="left">Start</TableCell>
            <TableCell align="left">End</TableCell>
            <TableCell align="left">Agent</TableCell>
            <TableCell align="left">Remarks</TableCell>
            <TableCell align="left">Preferred Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {callbackDetailsArr.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <IconButton onClick={ () => updateActivity(row) }>
                  <EditIcon />
                </IconButton>  
              </TableCell>
              <TableCell align="left">{row.status_id}</TableCell>
              <TableCell align="left">{row.attempt_count}</TableCell>
              <TableCell align="left">{row.start}</TableCell>
              <TableCell align="left">{row.end}</TableCell>
              <TableCell align="left">{row.agent_id}</TableCell>
              <TableCell align="left">{row.remarks}</TableCell>
              <TableCell align="left">{row.preferred_date}</TableCell>
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