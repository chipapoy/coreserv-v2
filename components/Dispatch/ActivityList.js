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
import Upload from "../../components/Dispatch/Upload";


const ActivityTable = (props) => {

  const [activityArr,setActivityArr] = useState([]);
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

    await axios.post('/api/dispatch_request/getActivityList',{
      id: dispId
    })
    .then( result => {
      setActivityArr(result.data);

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
      setActivityArr([]);
    }

  }, [props]);

  return (
    // <TableContainer component={Paper}>
    <>
      <Table sx={{ maxWidth: 1200 }} size="small" aria-label="simple table" variant="head">
        <TableHead sx={{backgroundColor:'wheat'}}>
          <TableRow>
            <TableCell align="left">Action</TableCell>
            <TableCell align="left">Dispatch Date</TableCell>
            <TableCell align="left">Pickup Date</TableCell>
            <TableCell align="left">Crew/Assigned to</TableCell>
            <TableCell align="left">Action Taken</TableCell>
            <TableCell align="left">Remarks</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Completion Date</TableCell>
            <TableCell align="left">OR</TableCell>
            <TableCell align="left">SOA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityArr.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <IconButton onClick={ () => updateActivity(row) }>
                  <EditIcon />
                </IconButton>  
              </TableCell>
              <TableCell align="left">{dateViewFormat(row.disp_date)}</TableCell>
              <TableCell align="left">{dateViewFormat(row.pickup_date)}</TableCell>
              <TableCell align="left">{row.crew}</TableCell>
              <TableCell align="left">{row.action_taken}</TableCell>
              <TableCell align="left">{row.remarks !==null ? row.remarks : '-'}</TableCell>
              <TableCell align="left">{row.status !==null ? row.status : '-'}</TableCell>
              <TableCell align="left">{dateViewFormat(row.completion_date)}</TableCell>
              <TableCell align="left">
                <IconButton onClick={ () => viewAttachment('OR',row) }>
                  <AttachmentIcon />
                </IconButton> 
              </TableCell>
              <TableCell align="left">
                <IconButton onClick={ () => viewAttachment('SOA',row) }>
                  <AttachmentIcon />
                </IconButton> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateActivity openUpdateModal={openModal} modalFunction={modalCallback} />
      <Upload uploadModal={uploadModal} uploadCallback={uploadCallback} />
    </>
    // </TableContainer>
  );
}

export default ActivityTable