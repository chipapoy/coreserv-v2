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

    const [data,setData] = useState([]);


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
        },{
            name: "bldg_name",
            label: "Address",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "contact_num",
            label: "Contact Number",
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
            label: "City",
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
                            pathname:'/vendors/update',
                            query: { id: rowData[0] }
                        }}
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
        onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) =>
            console.log(allExpanded),
        customToolbar: () => {

            // const handleClick = () => {
            //     console.log("clicked on icon!");
            // }
            
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
                        color: '#FFF'
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