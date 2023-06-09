import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Grid,Stack,Chip,TextField,FormControl,InputLabel,Select,MenuItem,
  Card,CardHeader,CardContent,CardActions,ButtonGroup,Container,Divider
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
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #DDDDDD',
  boxShadow: 5,
  p: 2
};

export default function BasicModal(props) {

  const fileDefinition = {
    'OR':'Official Receipt',
    'SOA':'Statement of Account'
  }
  const pageTitle = fileDefinition[props.uploadModal.type];

  const [open, setOpen] = useState(false);
  const [checkFile, setCheckFile] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setCheckFile(false);
    props.uploadCallback({
      open: false,
      cancel: true
    });
  }
  const [attachmentsArr,setAttachmentsArr] = useState([]);
  const [fileUpload,setFileUpload] = useState([]);
  const [uploadBtnDisabled,setUploadBtnDisabled] = useState(true);

  const onFileChange = (e) => {

    const fileSize = e.target.files[0].size / (1024 * 1024);
    console.log(fileSize);
    console.log(props.uploadModal.id);
    
    setFileUpload({
        file: e.target.files[0]
    });

    setUploadBtnDisabled(false);
  }

  const onUpload = e => {
    // console.log(fileUpload.file);
    e.preventDefault();


    const formData = new FormData();

    formData.append('file',fileUpload.file);
    formData.append('ref_id',props.uploadModal.id);
    formData.append('rec_type',props.uploadModal.type);

    const uploadId = toast.loading("Uploading...");

    console.log(formData)

    axios.post(
        '/api/dispatch_request/uploadFile',
        formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    )
    .then(res => {
        console.log(e)
        e.target.value = "";
        setUploadBtnDisabled(true);

        setTimeout(() => {
          toast.update(uploadId, {
            render: "File has been uploaded", 
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
              // router.push("/rfp");
              // getRfpUpload(rfpId);
            }
          });
        }, 2000);
    })
    .catch(err => {
        console.log(err);
        setTimeout(() => {
          toast.update(uploadId, {
            render: "Something went wrong. Please try again. " + err.response.data.error, 
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
              // setBtnDisabled(false);
              // setDisableForm(false);
              // getRfpUpload(rfpId);
            }
          });
        }, 2000);
    })
  }

  const getAttachments = async () => {

    await axios.post('/api/dispatch_request/getAttachments',{
      ref_id: props.uploadModal.id,
      type: props.uploadModal.type,
    })
    .then( result => {
      setAttachmentsArr(result.data);

      // console.log(Object.keys(result.data).length > 0);
      if(Object.keys(result.data).length > 0){
        setCheckFile(true);
      }
    })
    .catch( err => {
      console.log(err)
    });
  };

  const NoFile = () => {

    console.log('this is upload form component');

    return (
      <>
        <Typography variant="body2" gutterBottom>
          No file has found.
        </Typography>
        <FormControl fullWidth sx={{ m: 2 }} variant="standard">
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" disableElevation>
              <Button variant='text' children={<input type="file" name="file_upload" onChange={onFileChange} accept=".pdf,.jpg"  />} />
              <Button onClick={onUpload} disabled={uploadBtnDisabled} children="Upload" />
            </ButtonGroup>
        </FormControl>
      </>
    );
  }

  const HasFile = (data) => {

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
        {/* <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography> */}
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
              defaultZoom: 1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
        />
      </>
    );
  }

  const UploadForm = (props) => {

    // console.log(props);

    if(props.checking){
      return <HasFile data={props.data} />
    }

    return <NoFile />
  }

  useEffect(() => {
    
    if(props.uploadModal.open){
      // getDispatchData(props.dispId);
      console.log("from Upload.js");
      getAttachments();
    }

    return () => {
      setAttachmentsArr([]);
      setCheckFile(false);
    }

  }, [props]);

  return (
    <div>
      <Modal
        open={props.uploadModal.open}
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
              <UploadForm data={attachmentsArr} checking={checkFile} />
            </Typography>
          </Box>
          
        </Container>
      </Modal>
    </div>
  );
}