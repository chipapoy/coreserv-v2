import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Container
} from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const style = {
  position: 'absolute',
  top: '300px',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  width: '500',
  bgcolor: 'background.paper',
  border: '1px solid #DDDDDD',
  boxShadow: 5,
  p: 2,
};

export default function BasicModal(props) {

  const pageTitle = props.pageTitle;

  const [open, setOpen] = useState(false);
  const [checkFile, setCheckFile] = useState(false);
  const handleClose = () => {
    // setOpen(false);
    // setCheckFile(false);
    props.viewSoaCallback({
      open: false,
      cancel: true,
      data: null
    });
  }
  const [attachmentsArr,setAttachmentsArr] = useState([]);
  const [fileUpload,setFileUpload] = useState([]);
  const [uploadBtnDisabled,setUploadBtnDisabled] = useState(true);



  const Soa = (data) => {

    if(data){

      const path = data.data.file_path;
      console.log(path.replace('public',''));
      console.log('this is attachment component');
    }

    const docs = [
      { uri: data.data.file_path.replace('public','') }, // Local File
    ];

    return (
      <>
        <DocViewer
          documents={docs}
          // initialActiveDocument={docs[0]}
          pluginRenderers={DocViewerRenderers}

          config={{
            header: {
              disableHeader: false,
              disableFileName: true,
              retainURLParams: false,
            },
            pdfZoom: {
              defaultZoom: 10, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
        />
      </>
    );
  }

  useEffect(() => {
    
    if(props.open){
      console.log("from Viewfile.js");
      console.log(props);
    }

  }, [props]);

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: 'scroll',
          top:'1%',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={style}>
              <Typography variant="h5">
                View File
                <Button 
                  disableElevation
                  variant="outlined" 
                  color="error" 
                  onClick={ handleClose }
                  children="Close"
                  sx={{
                    float: 'right'
                  }}
                />  
              </Typography>
            <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>
              <Soa data={props.data} />
            </Typography>
          </Box>
          
        </Container>
      </Modal>
    </div>
  );
}