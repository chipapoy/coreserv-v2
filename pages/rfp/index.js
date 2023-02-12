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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

  const [data,setData] = useState([]);

  useEffect(() => {
      
    // getData();
    const cancelToken = axios.CancelToken.source();
    let settingData = true;
    
    axios.get('/api/getRfpList', {cancelToken:cancelToken.token})
    .then( (res) => {
      if(settingData){
          setData(res.data);
      }
    })
    .catch( (err) => {

      if(settingData){
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
      }
    })

    return () => {
      settingData = false;
      cancelToken.cancel();
      setData([]);
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
              sort: true
          }
      },
      // {
      //     name: "address",
      //     label: "Address",
      //     options: {
      //         filter: true,
      //         sort: true,
      //     }
      // },
      {
          name: "contact_num",
          label: "Contact #",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "tin_num",
          label: "TIN Number",
          options: {
              filter: true,
              sort: true,
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
          }
      },{
          name: "account",
          label: "System",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "rfp_type",
          label: "RFP Type",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "contact_person",
          label: "Sky Contact Person",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "contact_number",
          label: "Sky Contact Number",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "email_add",
          label: "Sky Email Address",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "email_add",
          label: "Sky Email Address",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "internal_order1",
          label: "Internal Order 1",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "internal_order2",
          label: "Internal Order 2",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "bill_period",
          label: "Bill Period",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "bill_month",
          label: "Bill Month",
          options: {
              filter: true,
              sort: true,
          }
      },{
          name: "current_reading",
          label: "Current Reading",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "previous_reading",
          label: "Prev Reading",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "consumption",
          label: "Consumption",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "rate",
          label: "Rate",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "amount",
          label: "Amount",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "vat_amount",
          label: "VAT Amount",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "interest",
          label: "Interest",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "penalty",
          label: "Penalty",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "penalty_over_interest_vat_amount",
          label: "Penalty/Interest VAT Amount",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "surcharge",
          label: "Surcharge",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "miscellaneuos",
          label: "Miscellaneuos",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "total_amount",
          label: "Total Amount",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "date_bill_received",
          label: "Date Bill Received",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "due_date",
          label: "Due Date",
          options: {
              filter: false,
              sort: true,
          }
      },{
          name: "rfp_date",
          label: "RFP Date",
          options: {
              filter: false,
              sort: true,
          }
      }

  ];

  const options = {
    filterType: 'multiselect',
    responsive: 'scroll',
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
          {/* <Link 
              href={{
                  pathname:'/rfp/request',
                  query: { id: rowData[0] }
              }}
              title='Request'
          >  
              <Tooltip>
                  <IconButton>
                      <ReceiptIcon  />
                  </IconButton>
              </Tooltip>
          </Link> */}
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
        <Link href='/rfp/create'>  
          <Tooltip title="Create RFP">
            <IconButton>
              <AddIcon  />
            </IconButton>
          </Tooltip>
        </Link>
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
            lineHeight: 0
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


  return (
    <>
      <Head>
        <title>Coreserv</title>
      </Head>
      <div id="main_content">

          <Sidemenu></Sidemenu>
          {/* <ToastContainer /> */}
          <div className="page">
            <div id="page_top" className="section-body">
              <div className="container-fluid">
                <div className="page-header">
                  <Topmenu></Topmenu>
                </div>
              </div>
            </div>
            <div className="section-body">
              <div className="container-fluid">
                <h4>RFP</h4>
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