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
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

    const pageTitle = 'MDU List';

    const [data,setData] = useState([]);
    const [rowsExpand,setRowsExpand] = useState([]);

    // const getData = async () => {

    //     try {
    //         const result = await axios.get('/api/getVendorList');

    //         setData(result.data);
    //     } 
    //     catch (error) {
            
    //         toast.error('Unable to connect to server. Please try again.', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: false,
    //             progress: undefined,
    //             theme: "dark",
    //         });

    //         setData([]);
    //     }
    // };

    useEffect(() => {

        // getData();
        const cancelToken = axios.CancelToken.source();
        let settingData = true;
        
        axios.get('/api/vendor_request/getVendorList', {cancelToken:cancelToken.token})
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
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                setCellProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },{
            name: "bldg_name",
            label: "Bldg",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                setCellProps: () => ({style: {whiteSpace:'nowrap'}})
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
            label: "City",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "contact_person",
            label: "Contact Person",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },{
            name: "contact_num",
            label: "Number",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },{
            name: "tier_segment",
            label: "Tier",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "kam",
            label: "KAM",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "account",
            label: "Account",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "payment_terms",
            label: "Payment Terms",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },{
            name: "soa_type",
            label: "SOA",
            options: {
                filter: true,
                sort: true,
            }
        },

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

            return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <Link 
                        href={{
                            pathname:'/vendors/edit/'+rowData[0]
                        }}
                        title='Update'
                    >  
                        <Tooltip>
                            <IconButton>
                                <EditIcon  />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </TableCell>
            </TableRow>
            );
        },
        onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {

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

            // const handleClick = () => {
            //     console.log("clicked on icon!");
            // }
            
            return (
                <Link href='/vendors/create'>  
                    <Tooltip title="Add new Vendor">
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
                        color: '#FFFFFF !important',
                        padding: '12px !important'
                    },
                },
            },
            MUIDataTableSelectCell: {
                styleOverrides: {
                    headerCell: {
                        backgroundColor: '#E35217',
                        color: '#FFF'
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
                    <Topmenu></Topmenu>
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