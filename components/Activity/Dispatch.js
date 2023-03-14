import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Activity = (props) => {
  const [open, setOpen] = useState(false);
  const [rfpData,setRfpData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);

    console.log(rfpData)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRfpDetails = async (rfpId) => {

    await axios.post('/api/rfp_request/getRfpDetails',{
      id : rfpId
    })
    .then( (result) => {
      setRfpData(result.data);
    })
    .catch( (err) => {
      console.log(err);
    });
  };

  useEffect(() => {

    getRfpDetails(props.data[0]);

    return () => {
      setRfpData([]);
    }

  }, [props.data[0]]);

  return (
    <div>
      <SendTimeExtensionIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>Dispatch </DialogTitle>
        <DialogContent>
          <Chip label={rfpData.vendor_name} />
          <TextField 
            label="Amount" 
            variant="standard" 
            aria-readonly={true}
            value={ rfpData.total_amount }
            disabled={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Proceed</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Activity