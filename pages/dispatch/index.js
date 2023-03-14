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
import ReceiptIcon from "@mui/icons-material/Receipt";
import Tooltip from "@mui/material/Tooltip";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const Index = () => {

  const [data,setData] = useState([]);

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

  useEffect(() => {
      
    getData();

    return () => {
      setData([])
      // setData([]);
    }
  }, []);


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
          name: "check_num",
          label: "Check #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "check_date",
          label: "Check Date",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].check_date).format('DD-MMM-YY');
              }
          }
      },{
          name: "ref_num",
          label: "Reference#",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
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
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].check_date).format('DD-MMM-YY');
              }
          }
      },{
          name: "or_num",
          label: "OR #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "or_date",
          label: "OR Date",
          options: {
            filter: false,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return moment(data[dataIndex].or_date).format('DD-MMM-YY');
            }
          }
      },{
          name: "action_taken",
          label: "Action Taken",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "remarks",
          label: "Remarks",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "team_code",
          label: "Team Code",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "team_assigned",
          label: "Team Assigned",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "abs_cbn_received_date",
          label: "Date Received by ABS-CBN",
          options: {
            filter: true,
            sort: true,
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
        name: "received_by",
        label: "Received by",
        options: {
          filter: true,
          sort: true,
          setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        }
    }

  ];

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
        console.log(rowData[0])
        console.log(meta)
    },
    expandableRows: true,
    expandableRowsHeader: false,
    isRowExpandable: (dataIndex, expandedRows) => {
        // if (dataIndex === 3 || dataIndex === 4) return false;

        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0)
        return false;
        return true;
    },
    // rowsExpanded: [0, 1],
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;

      return (
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Link 
            href={{
                pathname:'/dispatch/edit/'+rowData[0]
            }}
            title='Update'
          >
            <Tooltip>
              <IconButton>
                <EditIcon  />
              </IconButton>
            </Tooltip>
          </Link>
          <Link 
            href={{
                pathname:'/dispatch/delete',
                query: { id: rowData[0] }
            }}
            title='Delete'
          >  
            <Tooltip>
              <IconButton>
                <DeleteIcon  />
              </IconButton>
            </Tooltip>
          </Link>
        </TableCell>
      </TableRow>
      );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
      console.log(allExpanded)
    },
    customToolbar: () => { 
      return (
        <><Link href='/dispatch/create'>  
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
            color: '#FFF',
            lineHeight: 0,
            padding: '12px'
          },
        },
      },
      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: '#E35217',
            color: '#FFF',
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

  const testReload = () => {
    getData();
    console.log("test");
  }

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
                <h4>Dispatch</h4>
                <ThemeProvider theme={theme}>
                  <MUIDataTable 
                    title="" 
                    data={data} 
                    columns={columns} 
                    options={options}
                    data-tableid="vendorList" 
                  />
                </ThemeProvider>
              </div>
            </div>
          </div>    
      </div>
    </>
  )
}


export default Index