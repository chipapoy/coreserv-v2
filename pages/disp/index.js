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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from "@mui/material/Tooltip";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ActivityList from "../../components/Dispatch/ActivityList";
import NewActivity from "../../components/Dispatch/NewActivity";
import DeleteForm from "../../components/Forms/Delete";

const Index = () => {

  const pageTitle = 'Dispatch';
  const [data,setData] = useState([]);
  const [dispDetails,setDispDetails] = useState(0);
  const [deleteDetails,setDeleteDetails] = useState({});
  const [rowsExpand,setRowsExpand] = useState([]);
  const [keyTable,setKeyTable] = useState(moment().unix());

  const getData = async () => {

    const cancelToken = axios.CancelToken.source();
    axios.get('/api/dispatch_request/getDispatchList', {cancelToken:cancelToken.token})
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
          name: "disp_type",
          label: "Dispatch Type",
          options: {
              filter: true,
              sort: true,
              setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRender: (value, tableMeta) => {
                return value;
              }
          }
      },{
          name: "check_num",
          label: "Check #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRender: (value, tableMeta) => {
                return value!=0 ? value : 'N/A';
              }
          }
      },{
          name: "check_date",
          label: "Check Date",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              // customBodyRenderLite: (dataIndex, rowIndex) => {
              //   return moment(data[dataIndex].check_date).format('DD-MMM-YY');
              // }
              customBodyRender: (value, tableMeta) => {

                let date = moment(value).format('DD-MMM-YY');

                return date!='Invalid date' ? date : '-';
              }
          }
      },{
          name: "ref_num",
          label: "Reference#",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRender: (value, tableMeta) => {
                return value!=0 ? value : 'N/A';
              }
          }
      },{
          name: "vendor_name",
          label: "Vendor Name",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              setCellProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "amount",
          label: "Amount",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "pickup_date",
          label: "Pick up Date",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              // customBodyRenderLite: (dataIndex, rowIndex) => {
              //   return moment(data[dataIndex].check_date).format('DD-MMM-YY');
              // }
              customBodyRender: (value, tableMeta) => {

                let date = moment(value).format('DD-MMM-YY');

                return date!='Invalid date' ? date : '-';
              }
          }
      },{
          name: "or_num",
          label: "OR #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRender: (value, tableMeta) => {
                return value!=0 ? value : 'N/A';
              }
          }
      },{
          name: "or_date",
          label: "OR Date",
          options: {
            filter: false,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
            // customBodyRenderLite: (dataIndex, rowIndex) => {
            //   return moment(data[dataIndex].or_date).format('DD-MMM-YY');
            // }
            customBodyRender: (value, tableMeta) => {

              let date = moment(value).format('DD-MMM-YY');

              return date!='Invalid date' ? date : '-';
            }
          }
      },{
          name: "remarks",
          label: "Remarks",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              // customBodyRenderLite: (dataIndex, rowIndex) => {
              //   return data[dataIndex].remarks!=null ? data[dataIndex].remarks : '-';
              // }
          }
      },{
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return data[dataIndex].status!=null ? data[dataIndex].status : '-';
            }
        }
    },{
          name: "crew",
          label: "Team Code",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {

                const crewArr = data[dataIndex].crew ? data[dataIndex].crew.split(',') : '-';
                return crewArr[0];
              }
          }
      },{
          name: "crew",
          label: "Team Assigned",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {

                const crewArr = data[dataIndex].crew ? data[dataIndex].crew.split(',') : '-';
                return crewArr[1];
              }
          }
      }
      
      // ,{
      //     name: "abs_cbn_received_date",
      //     label: "Date Received by ABS-CBN",
      //     options: {
      //       filter: true,
      //       sort: true,
      //       setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
      //     }
      // },{
      //   name: "received_by",
      //   label: "Received by",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
      //   }
      // }

  ];

  const [openModal,setOpenModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal] = useState(false);

  const [activityCount,setActivityCount] = useState(0);

  const modalCallback = (data) => {

    setOpenModal(data.open);

    const keyUnix = moment().unix();
    setKeyTable(keyUnix);
    
    if(data.cancel == false){
      getData();
    }
    
  }

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

  const updateCallback = (data) => {
    console.log(data);
    console.log("callback from update");

    if(data.update == true){
      getData();
    }
  }

  const listCallback = (data) => {
    console.log(data.listCount);
    console.log("callback from activity list");

    setActivityCount(data.listCount);

    // if(data.update == true){
    //   getData();
    // }
  }

  const activityListCallback = (data) => {
    return <ActivityList {...data}/>
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

      console.log(rowData);

      return (
        <>
          <TableRow>
            <TableCell colSpan={colSpan}>
              <Link 
                href={{
                    pathname:'/disp/edit/'+rowData[0]
                }}
              >
                <Tooltip title='Update'>
                  <IconButton>
                    <EditIcon  />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title='Add Activity'>
                <IconButton disabled={ rowData[9]=="COMPLETED" || rowData[9]==null  ? (activityCount > 0 ? true : false) : false }>
                  <AddTaskIcon 
                    onClick={()=> {
                      setOpenModal(true); 
                      setDispDetails(rowData);
                      console.log(rowData);
                    }}  
                    
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton>
                  <DeleteIcon 
                    onClick={()=> {
                      setOpenDeleteModal(true); 
                      setDeleteDetails({
                        data: rowData,
                        url: '/api/dispatch_request/deleteDispatch',
                        module: 'Dispatch'
                      });
                      console.log(rowData);
                    }}
                  />
                </IconButton>
              </Tooltip>
              {/* { 
                activityListCallback({ 
                  key:rowData[0],
                  dispId:rowData[0],
                  test: true,
                  updateCallback: updateCallback,
                  listCallback: listCallback
                }) 
              } */}
              <ActivityList
                key={keyTable}
                dispId={rowData[0]}
                test={true}
                updateCallback={updateCallback}
                listCallback={listCallback}
              />
            </TableCell>
          </TableRow>
        </>
        
      );
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
          var rowsExpanded = tableState.expandedRows.data.map(
            item => item.index
          );

          if (rowsExpanded.length > 1) {
            // limiting would go here
            rowsExpanded = rowsExpanded.slice(-1);
          }

          setRowsExpand(rowsExpanded);

          break;
      }
    },
    customToolbar: () => { 
      return (
        <><Link href='/disp/create'>  
            <Tooltip title="New Dispatch">
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
                <NewActivity open={openModal} dispDetails={dispDetails} modalFunction={modalCallback}/>
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