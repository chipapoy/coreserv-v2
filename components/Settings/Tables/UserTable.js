import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination, { tablePaginationClasses } from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Grid,Stack,Chip,TextField,FormControl,FormControlLabel,InputLabel,Select,MenuItem,Button,Typography,Switch,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const AddModal = (props) => {
  let modalTitle = "Add new USER ";
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

  const [open, setOpen] = useState(false);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [userType, setUserType] = useState([]);
  const [userTypeArr, setUserTypeArr] = useState([]);

  const [submitDisabled,setSubmitDisabled] = useState(false);
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  const handleClose = () => {
    setOpen(false);
    props.modalFunction({
      open: false,
      cancel: true
    });

    setName('');
    setEmail('');
    setUserType('');
  }

  const submitData = e => {
    
    e.preventDefault();

    setSubmitDisabled(true);
    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/maintenance_request/insert/insertUser';
    
    const data = {
      name: name,
      email: email,
      user_type: userType,
      user: localStorage.name,
      encode_date:  moment().format('YYYY-MM-DD HH:mm')
    }

    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "User has been added", 
          type: 'success',
          isLoading: false,
          delay:undefined,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            // router.push("/dispatch");
            props.modalFunction({
              open: false,
              cancel: false
            });
            setSubmitDisabled(false);
            setBtnDisabled(false);
            setDisableForm(false);

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
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            setSubmitDisabled(false);
            setBtnDisabled(false);
            setDisableForm(false);
          }
        });
      }, 2000);


    });
  }

  const getUserTypeArr = async () => {

    const result = await axios.get('/api/settings/getUserType');

    setUserTypeArr(result.data);
  };

  useEffect(() => {

    getUserTypeArr();
    setOpen(props.open);

    return () => {
      setUserTypeArr([]);
    }

  }, [props]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={submitData}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">{modalTitle}</Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Name" 
                    variant="standard"
                    required
                    multiline
                    maxRows={4}
                    value={name}
                    onChange={ e => setName(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Email" 
                    variant="standard"
                    required
                    multiline
                    maxRows={4}
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">User Type</InputLabel>
                  <Select
                    label="User Type"
                    value={userType}
                    onChange={ e => setUserType(e.target.value) }
                    required
                  >
                    
                    {userTypeArr.map( status => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            {/* Buttons */}
            <Grid item xs={12} lg={12}>
              <Stack spacing={2} direction="row">
                <Button 
                  disableElevation
                  variant="outlined" 
                  color="primary" 
                  type="submit"
                  disabled={submitDisabled}
                >Submit</Button>
                <Button 
                  disableElevation
                  variant="outlined" 
                  color="error" 
                  disabled={btnDisabled}
                  onClick={ handleClose }
                >Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Modal>
  )
}

const EditModal = (props) => {
  let modalTitle = "Update USER ";
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

  const [open, setOpen] = useState(false);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [userType, setUserType] = useState([]);
  const [active, setActive] = useState([]);
  const [userTypeArr, setUserTypeArr] = useState([]);

  const [submitDisabled,setSubmitDisabled] = useState(false);
  const [btnDisabled,setBtnDisabled] = useState(false);
  const [disableForm,setDisableForm] = useState(false);

  const handleClose = () => {
    setOpen(false);
    props.modalFunction({
      open: false,
      cancel: true
    });
  }

  const handleActive = e => {
    // console.log(e.target.checked);
    setActive(e.target.checked==true?1:0);
  }

  const submitData = e => {
    
    e.preventDefault();

    setSubmitDisabled(true);
    setBtnDisabled(true);
    setDisableForm(true);
    
    const url = '/api/maintenance_request/update/updateUser';
    
    const data = {
      id: props.id,
      name: name,
      email: email,
      user_type: userType,
      is_active: active,
      user: localStorage.name,
      update_date:  moment().format('YYYY-MM-DD HH:mm')
    }

    const notifId = toast.loading("Please wait...");
    
    axios.post(url, data)
    .then( res => {
      // resolve(res);
      setTimeout(() => {
        toast.update(notifId, {
          render: "User has been updated", 
          type: 'success',
          isLoading: false,
          delay:undefined,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            // router.push("/dispatch");
            props.modalFunction({
              open: false,
              cancel: false
            });
            setSubmitDisabled(false);
            setBtnDisabled(false);
            setDisableForm(false);

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
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            setSubmitDisabled(false);
            setBtnDisabled(false);
            setDisableForm(false);
          }
        });
      }, 2000);


    });
  }

  const getUserTypeArr = async () => {

    const result = await axios.get('/api/settings/getUserType');

    setUserTypeArr(result.data);
  };

  useEffect(() => {

    setOpen(props.open);
    getUserTypeArr();

    const filtered = props.data.filter(row => {
      return row.id === parseInt(props.id);
    });

    if(props.open==true){
      // setRecordDetail(filtered[0]);
      setName(filtered[0].name);
      setEmail(filtered[0].email);
      setUserType(filtered[0].user_type);
      setActive(filtered[0].is_active);
    }

    return () => {
      setUserTypeArr([]);
    }

  }, [props]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={submitData}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">{modalTitle}</Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Name" 
                    variant="standard"
                    required
                    multiline
                    maxRows={4}
                    value={name}
                    onChange={ e => setName(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField 
                    label="Email" 
                    variant="standard"
                    required
                    multiline
                    maxRows={4}
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                    disabled={disableForm}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">User Type</InputLabel>
                  <Select
                    label="User Type"
                    value={userType}
                    onChange={ e => setUserType(e.target.value) }
                    required
                  >
                    {userTypeArr.map( status => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <FormControlLabel control={<Switch checked={active} onChange={handleActive} disabled={disableForm} />} label="Active" />
                </FormControl>
              </Grid>
            {/* Buttons */}
            <Grid item xs={12} lg={12}>
              <Stack spacing={2} direction="row">
                <Button 
                  disableElevation
                  variant="outlined" 
                  color="primary" 
                  type="submit"
                  disabled={submitDisabled}
                >Submit</Button>
                <Button 
                  disableElevation
                  variant="outlined" 
                  color="error" 
                  disabled={btnDisabled}
                  onClick={ handleClose }
                >Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Modal>
  )
}

const TableList = () => {
  let tableHeaderColor = 'wheat';
  let tableTitle = "USER List";

  const [dataArr,setDataArr] = useState([]);
  const [openAddModal,setOpenAddModal] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const [recordId,setRecordId] = useState(null);

  const getDataArr = async () => {

    const cancelToken = axios.CancelToken.source();
    axios.get('/api/maintenance_request/getUserSettings', {cancelToken:cancelToken.token})
    .then( (result) => {
      setDataArr(result.data);
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

  useEffect( () => {

    getDataArr();

    return () => {
      setDataArr([]);
    }

  },[]);

  // TABLE PAGINATION
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataArr.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  // MODAL
    const handleAdd = (e) => {
      setOpenAddModal(true);
    }

    const modalAddCallback = (data) => {
      setOpenAddModal(data.open);
      if(data.cancel == false){
        getDataArr();
      }
    }

    const handleEdit = (e) => {
      setOpenModal(true);
      setRecordId(e.currentTarget.getAttribute('data-id'));

      // console.log(e.target.dataset.id);
      console.log(e.currentTarget.getAttribute('data-id'));
    }

    const modalCallback = (data) => {
      setOpenModal(data.open);

      if(data.cancel == false){
        getDataArr();
      }
      
    }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead sx={{ backgroundColor: tableHeaderColor }}>
            <TableRow>
              <TableCell colSpan={7}>
                <IconButton aria-label="add" size="small">
                  <AddIcon
                    fontSize="inherit"
                    onClick={handleAdd}
                  />
                </IconButton>
                {tableTitle}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Action</TableCell>
              <TableCell component="th">Name</TableCell>
              <TableCell component="th">Email</TableCell>
              <TableCell component="th">User Type</TableCell>
              <TableCell component="th">Encode by</TableCell>
              <TableCell component="th">Encode date</TableCell>
              <TableCell component="th">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : dataArr
            ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <IconButton aria-label="edit" size="small">
                      <EditIcon 
                        fontSize="inherit"
                        onClick={handleEdit}
                        data-id={row.id}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell scope="row">{row.email}</TableCell>
                  <TableCell scope="row">{row.user_type}</TableCell>
                  <TableCell scope="row">{row.encode_by}</TableCell>
                  <TableCell scope="row">{row.encode_date}</TableCell>
                  <TableCell scope="row">{row.is_active}</TableCell>
                </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                sx={{
                  [`& .${tablePaginationClasses.toolbar}`]: {
                    alignItems: "baseline"
                  }
                }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={7}
                count={dataArr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <AddModal 
        open={openAddModal}
        modalFunction={modalAddCallback}
      />
      <EditModal 
        id={recordId}
        open={openModal}
        modalFunction={modalCallback}
        data={dataArr}
      />
    </>
    
  );

}


export default TableList