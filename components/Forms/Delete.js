import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Grid,Stack,Chip,TextField,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #DDDDDD',
  boxShadow: 5,
  p: 2,
};

export default function BasicModal(props) {

  const recordName = props.deleteDetails.module == "Dispatch" ? props.deleteDetails.data[4] : props.deleteDetails.data[1];

  const pageTitle = 'Delete ' + props.deleteDetails.module + ' - ' + recordName +  ' ?';

  const [deleteReason,setDeleteReason] = useState('');

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    props.deleteCallback({
      open: false,
      cancel: true
    });
  }
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  useEffect(() => {

    setOpen(props.open);

    console.log(props);

    return () => {
      // setDispatchData([]);
    }

  }, [props]);

  const submitData = e => {
    
    e.preventDefault();
    
    const url = props.deleteDetails.url
    const data = {
      rec_id: props.deleteDetails.data[0],
      module: props.deleteDetails.module,
      reason: deleteReason
    }
    
    console.log(data);
    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: props.deleteDetails.module + " has been deleted", 
          type: 'success',
          isLoading: false,
          delay:undefined,
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            // router.push("/dispatch");
            props.deleteCallback({
              open: false,
              cancel: false
            });
          }
        });
      }, 2000);

        
    })
    .catch(err => {

      setTimeout(() => {
        toast.update(notifId, {
          render: "Something went wrong. Please try again.", 
          type: 'error',
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            setBtnDisabled(false);
            setDisableForm(false);
          }
        });
      }, 2000);


    });
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitData}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{pageTitle}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField
                    label="Reason" 
                    variant="standard" 
                    type='text'
                    value={deleteReason}
                    disabled={disableForm}
                    required
                    onChange={ e => {
                      setDeleteReason(e.target.value) 
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Stack spacing={2} direction="row">
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="primary" 
                    type="submit"
                    disabled={btnDisabled}
                    children="Submit"
                  />
                  <Button 
                    disableElevation
                    variant="outlined" 
                    color="error" 
                    disabled={btnDisabled}
                    onClick={ handleClose }
                    children="Cancel"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </div>
  );
}