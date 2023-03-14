import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head'
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
import CachedIcon from '@mui/icons-material/Cached';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Activity from "../../components/Activity/Dispatch";

const Index = () => {

  const [data,setData] = useState([]);

  const pageTitle = 'Request for Payment'

  const getData = async () => {

    const cancelToken = axios.CancelToken.source();
    axios.get('/api/rfp_request/getRfpList', {cancelToken:cancelToken.token})
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
          name: "vendor_name",
          label: "Vendor",
          options: {
              filter: true,
              sort: true,
              setCellProps: () => ({style: {whiteSpace:'nowrap'}})
              // customHeadRender: ({index, ...column}) => {
              //   return (
              //     <TableCell key={index} style={columnStyleWithWidth}>
              //         {column.label}
              //     </TableCell>
              //   )
              // }
          }
      },{
          name: "vendor_code",
          label: "Code",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "city",
          label: "Area",
          options: {
              filter: true,
              sort: true,
              setCellProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "account",
          label: "System",
          options: {
              filter: true,
              sort: true,
              setCellProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "rfp_type",
          label: "RFP Type",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "contact_num",
          label: "Contact #",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "tin_num",
          label: "TIN Number",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "contact_person",
          label: "Sky Contact Person",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "contact_number",
          label: "Sky Contact Number",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "email_add",
          label: "Sky Email Address",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "internal_order1",
          label: "Internal Order 1",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "internal_order2",
          label: "Internal Order 2",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
          }
      },{
          name: "bill_period",
          label: "Bill Period",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              setCellProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {

                const dateArr = data[dataIndex].bill_period.split(' ');

                return moment(dateArr[0]).format('DD-MMM-YY') + ' to ' + moment(dateArr[1]).format('DD-MMM-YY') ;
              }
          }
      },{
          name: "bill_month",
          label: "Bill Month",
          options: {
              filter: true,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
          }
      },{
          name: "current_reading",
          label: "Current Reading",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].current_reading;
              }
          }
      },{
          name: "previous_reading",
          label: "Prev Reading",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].previous_reading;
              }
          }
      },{
          name: "consumption",
          label: "Consumption",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].consumption;
              }
          }
      },{
          name: "rate",
          label: "Rate",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].rate;
              }
          }
      },{
          name: "amount",
          label: "Amount",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].amount;
              }
          }
      },{
          name: "vat_amount",
          label: "VAT Amount",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].vat_amount;
              }
          }
      },{
          name: "interest",
          label: "Interest",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].interest;
              }
          }
      },{
          name: "penalty",
          label: "Penalty",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].penalty;
              }
          }
      },{
          name: "penalty_over_interest_vat_amount",
          label: "Penalty/Interest VAT Amount",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].penalty_over_interest_vat_amount;
              }
          }
      },{
          name: "surcharge",
          label: "Surcharge",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].surcharge;
              }
          }
      },{
          name: "miscellaneuos",
          label: "Miscellaneuos",
          options: {
              filter: false,
              sort: true,
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].miscellaneuos;
              }
          }
      },{
          name: "total_amount",
          label: "Total Amount",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return data[dataIndex].rfp_type === 'Rental' ? 'N/A' : data[dataIndex].total_amount;
              }
          }
      },{
          name: "date_bill_received",
          label: "Date Bill Received",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].date_bill_received).format('DD-MMM-YY');
              }
          }
      },{
          name: "due_date",
          label: "Due Date",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].due_date).format('DD-MMM-YY');
              }
          }
      },{
          name: "rfp_date",
          label: "RFP Date",
          options: {
              filter: false,
              sort: true,
              setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
              customBodyRenderLite: (dataIndex, rowIndex) => {
                return moment(data[dataIndex].rfp_date).format('DD-MMM-YY');
              }
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
                pathname:'/rfp/edit/'+rowData[0]
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
                pathname:'/rfp/view/'+rowData[0]
            }}
            target='_blank'
            title='View RFP'
          >  
            <Tooltip>
              <IconButton>
                <PaymentIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link 
            href={{
                pathname:'/rfp/delete',
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
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(allExpanded),
    customToolbar: () => { 
      return (
        <>
          <Link href='/rfp/create'>  
            <Tooltip title="Create RFP">
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
                <h4>{pageTitle}</h4>
                
                <ThemeProvider theme={theme}>
                  <MUIDataTable 
                      title="" 
                      data={data} 
                      columns={columns} 
                      options={options}
                      data-tableid="vendorList" 
                      // components={}
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