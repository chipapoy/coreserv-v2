import Link from 'next/link';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";
import MUIDataTable, { TableHead } from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton";
import CachedIcon from '@mui/icons-material/Cached';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from "@mui/material/Tooltip";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CallbackList from "../../components/Callback/CallbackList";
import NewCallback from "../../components/Callback/NewCallback";
import DeleteForm from "../../components/Forms/Delete";

const Index = () => {

  const pageTitle = 'On The Day';

  const [data,setData] = useState([]);
  const [deleteDetails,setDeleteDetails] = useState({});
  const [rowsExpand,setRowsExpand] = useState([]);

  const getData = async () => {

    const cancelToken = axios.CancelToken.source();
    axios.get('/api/otd_request/getOtdList', {cancelToken:cancelToken.token})
    .then( (res) => {
      setData(res.data);
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

  const columns = [
      {
          name: "id",
          label: "ID",
          options: {
              filter: false,
              sort: false,
              display:false
          }
      },{
          name: "otd_date",
          label: "Date",
          options: {
              filter: true,
              sort: true,
              setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].otd_date).format('DD-MMM-YY');
              }
          }
      },{
          name: "omt_tracking_num",
          label: "OMT Tracking #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "vendor_name",
          label: "Vendor",
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "concern",
          label: "Concern",
          options: {
            filter: true,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "technician",
          label: "Tech Name",
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "team_code",
          label: "Team Code",
          options: {
            filter: true,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "start",
          label: "Start",
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return moment(data[dataIndex].start).format('DD-MMM-YY HH:mm');
            }
          }
      },{
        name: "end",
        label: "End",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return moment(data[dataIndex].end).format('DD-MMM-YY HH:mm');
          }
        }
      },{
        name: "aht",
        label: "AHT",
        options: {
          filter: true,
          sort: true,
          setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          customBodyRenderLite: (dataIndex, rowIndex) => {
            let aht = data[dataIndex].aht;
            return aht.slice(0,-3);
          }
        }
      },{
            name: "encode_by",
            label: "Encode by",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },{
            name: "encode_date",
            label: "Encode date",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                customBodyRenderLite: (dataIndex, rowIndex) => {
                  return moment(data[dataIndex].check_date).format('DD-MMM-YY');
                }
            }
        }

  ];

  const [openDeleteModal,setOpenDeleteModal] = useState(false);

  const deleteModalCallback = (data) => {
    setOpenDeleteModal(data.open);
    
    if(data.cancel == false){
      getData();
    }
    
  }

  const deleteForm = (data) => {
    if(data.open == true){
      return <DeleteForm {...data}/>
    }
  }

  const testReload = () => {
    getData();
    console.log("test");
  }

  useEffect(() => {
      
    getData();

    return () => {
      setData([])
    }
  }, []);

  const options = {
    filterType: 'multiselect',
    responsive: 'standard',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '70vh',
    elevation: 0,
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    print: false,
    onRowClick: function(rowData,meta){
        // console.log(rowData[0])
        // console.log(meta)
    },
    expandableRows: true,
    expandableRowsHeader: false,
    isRowExpandable: (dataIndex, expandedRows) => {
        // if (dataIndex === 3 || dataIndex === 4) return false;

        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        // if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0)
        // return false;

        return true;
    },
    // rowsExpanded: [0, 1],
    rowsExpanded: rowsExpand,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;

      if(rowData){
        return (
          <>
            <TableRow>
              <TableCell colSpan={colSpan}>
                <Link 
                  href={{
                      pathname:'/otd/edit/'+rowData[0]
                  }}
                >
                  <Tooltip title='Update'>
                    <IconButton>
                      <EditIcon  />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title='Delete'>
                  <IconButton>
                    <DeleteIcon 
                      onClick={()=> {
                        setOpenDeleteModal(true); 
                        setDeleteDetails({
                          data: rowData,
                          url: '/api/otd_request/deleteOtd',
                          module: 'OTD'
                        });
                        console.log(rowData);
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </>
        );
      }
      
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
      // console.log('onRowExpansionChange');
      // console.log(curExpanded);
      // console.log(allExpanded);
      // console.log(rowsExpanded);
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case "rowExpansionChange":
          // console.log(action);
          // console.dir(tableState);
          var rowsExpanded = tableState.expandedRows.data.map(
            item => item.index
          );

          if (rowsExpanded.length > 1) {
            // limiting would go here
            rowsExpanded = rowsExpanded.slice(-1);
          }

          // console.dir(rowsExpanded);

          setRowsExpand(rowsExpanded);

          break;
      }
    },
    customToolbar: () => { 
      return (
        <><Link href='/otd/create'>  
            <Tooltip title="New OTD">
              <IconButton>
                <AddIcon  />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Refresh Data">
            <IconButton onClick={testReload}>
              <CachedIcon  />
            </IconButton>
          </Tooltip>
        </>
      );
    }
  }

  const theme = createTheme({
    components: {
      MUIDataTableHeadCell: {
        styleOverrides: {
          fixedHeader: {
            backgroundColor: '#E35217',
            color: '#FFFFFF !important',
            lineHeight: 0,
            padding: '12px !important'
          },
        },
      },
      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: '#E35217',
            color: '#FFF !important',
            lineHeight: 0
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            fontSize: '11px',
          },
        },
      }
    },
  });
  
  return (
    <>
      <Head>
        <title>Coreserv</title>
      </Head>
      <div id="main_content">
          <Sidemenu />
          {/* <ToastContainer /> */}
          <div className="page">
            <Topmenu />
            <div className="section-body">
              <div className="container-fluid">
                <h4>{pageTitle}</h4>
                <ThemeProvider theme={theme}>
                  <MUIDataTable 
                    title="" 
                    data={data} 
                    columns={columns} 
                    options={options}
                    data-tableid="vendorList" 
                  />
                </ThemeProvider>
                {/* <NewCallback open={openModal} callbackDetails={callbackDetails} modalFunction={modalCallback}/> */}
                {/* <DeleteForm open={openDeleteModal} deleteDetails={deleteDetails} deleteCallback={deleteModalCallback}/> */}
                {
                  deleteForm({
                    open:openDeleteModal,
                    deleteDetails:deleteDetails,
                    deleteCallback:deleteModalCallback
                  })
                }
              </div>
            </div>
          </div>    
      </div>
    </>
  )
}


export default Index