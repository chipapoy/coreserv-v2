import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import MUIDataTable, { TableHead } from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import ReceiptIcon from "@mui/icons-material/Receipt";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,Paper,FormHelperText
} from '@mui/material';

const Index = () => {

    const router = useRouter();
    
    const [profile,setProfile] = useState({
      // name:localStorage.name,
      // email:localStorage.email,
      // userType:localStorage.user_type,
      name: '',
      email: '',
      userType: ''
    });

    const [currentPassword,setCurrentPassword] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const [oldPassFormColor,setOldPassFormColor] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [newPassFormColor,setNewPassFormColor] = useState('');

    const [btnDisabled,setBtnDisabled] = useState(false);
    const [disableForm,setDisableForm] = useState(false);

    const [errorOldPassword,setErrorOldPassword] = useState(0);
    const [errorNewPassword,setErrorNewPassword] = useState(0);

    const pageTitle = 'Profile';

    const getPassword = async () => {

      const cancelToken = axios.CancelToken.source();
      axios.post('/api/access_request/getPassword', {cancelToken:cancelToken.token,id:localStorage.id})
      .then( (result) => {
        setCurrentPassword(result.data.password);
      })
      .catch( (err) => {
  
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
      })
  
    }

    useEffect(() => {

      getPassword();

      setProfile({
        name:localStorage.name,
        email:localStorage.email,
        userType:localStorage.user_type
      })

      return () => {
        setCurrentPassword('');
      }

    }, []);

  // TAB PANEL
    const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const [valueTab, setValueTab] = useState(0);

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
  //
    const handleOldPassword = e => {
      setOldPassword(e.target.value);

      const oldPass = md5(e.target.value);

      if(oldPass == currentPassword){
        setOldPassFormColor('success');
        setErrorOldPassword(0);
        console.log("Same");
      }
      else{
        setOldPassFormColor('error');
        setErrorOldPassword(1);
        console.log("Diff");
      }
    }

    const handleNewPassword = e => {

      const newPass = e.target.value;
      setNewPassword(newPass);
      
      if(newPass.length >= 8){
        setNewPassFormColor('success');
        setErrorNewPassword(0);
      }
      else{
        setNewPassFormColor('error');
        setErrorNewPassword(1);
      }
      
    }

    const updatePassword = e => {
      e.preventDefault();

      const errorCount =  errorOldPassword + errorNewPassword;

      if(errorCount === 0){

        setBtnDisabled(true);
        setDisableForm(true);

        const url = '/api/access_request/updatePassword'
        const data = {
          id: localStorage.id,
          new_password: md5(newPassword)
        }

        // console.log(data);
        const notifId = toast.loading("Please wait...");
        
        axios.post(url, data)
        .then( res => {
          // resolve(res);
          setTimeout(() => {
            toast.update(notifId, {
              render: "Password has been updated", 
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
                setBtnDisabled(false);
                setDisableForm(false);
                setOldPassword('');
                setNewPassword('');
                // router.push("/profile");
                getPassword();
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
      

    }

    return (
      <>
        <Head>
            <title>Coreserv</title>
        </Head>
        <div id="main_content">
          <Sidemenu />
          <div className="page">
            <Topmenu />
            <div className="section-body">
              <div className="container-fluid">
                <h4>{pageTitle}</h4>
                <div className="card">
                  <div className="card-body">
                  <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valueTab} onChange={handleChange} aria-label="">
                          <Tab label="Details" {...a11yProps(0)} />
                          <Tab label="Change Password" {...a11yProps(1)} />
                        </Tabs>
                      </Box>
                      <div // DETAILS
                        index={0}
                        role="tabpanel"
                        hidden={valueTab !== 0}
                        id={`simple-tabpanel-0`}
                        aria-labelledby={`simple-tab-0`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  primary="Name"
                                  secondary={profile.name}
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  primary="Email Address"
                                  secondary={profile.email}
                              />
                            </ListItem>
                            <ListItem divider='true' alignItems="flex-start">
                              <ListItemText 
                                  primary="User Type"
                                  secondary={profile.userType}
                              />
                            </ListItem>
                          </List>
                        </nav>
                      </div>
                      <div // PASSWORD
                        index={1}
                        role="tabpanel"
                        hidden={valueTab !== 1}
                        id={`simple-tabpanel-1`}
                        aria-labelledby={`simple-tab-1`}
                        value={valueTab}
                      >
                        <nav aria-label="main mailbox folders">
                          <form onSubmit={updatePassword} >
                            <List>
                              <ListItem  alignItems="flex-start">
                                <FormControl  sx={{ m: 1 }} variant="standard">
                                  <TextField 
                                    id="old_password"
                                    label="Old Password" 
                                    variant="standard"
                                    required
                                    type='password'
                                    value={oldPassword}
                                    onChange={ handleOldPassword }
                                    color={oldPassFormColor}
                                    disabled={disableForm}
                                  />
                                </FormControl>
                              </ListItem>
                              <ListItem  alignItems="flex-start">
                                <FormControl  sx={{ m: 1 }} variant="standard">
                                  <TextField 
                                    id="new_password"
                                    label="New Password" 
                                    variant="standard"
                                    required
                                    type='password'
                                    value={newPassword}
                                    onChange={ handleNewPassword }
                                    color={newPassFormColor}
                                    disabled={disableForm}
                                  />
                                  <FormHelperText id="component-helper-text">
                                    Enter atleast 8 characters
                                  </FormHelperText>
                                </FormControl>
                              </ListItem>
                              <ListItem  alignItems="flex-start">
                                <Button 
                                  disableElevation
                                  variant="outlined" 
                                  color="primary" 
                                  type="submit"
                                  disabled={btnDisabled}
                                  children="Save"
                                />
                              </ListItem>
                            </List>
                          </form>
                        </nav>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </>
    )
}


export default Index