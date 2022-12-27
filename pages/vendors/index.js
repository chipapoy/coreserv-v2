import Link from 'next/link';
import Image from "next/image";
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
import Tooltip from "@mui/material/Tooltip";

const Index = () => {

    const [data,setData] = useState([]);

    

    useEffect(() => {

        const getData = async () => {

            const result = await axios.get('/api/getVendorList');

            setData(result.data);

            // console.log(result.data);
        };

        getData();

        console.log(data);

        return () => {
            setData();
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
            label: "Bldg",
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
            label: "Contact Person",
            options: {
                filter: true,
                sort: true,
            }
        },{
            name: "contact_num",
            label: "Number",
            options: {
                filter: true,
                sort: true,
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
        responsive: 'scroll',
        selectableRowsHeader: false,
        selectableRowsHideCheckboxes: true,
        print: false,
        onRowClick: function(rowData,meta){
            console.log(rowData)
            console.log(meta)
        },
        expandableRows: true,
        expandableRowsHeader: false,
        isRowExpandable: (dataIndex, expandedRows) => {
            if (dataIndex === 3 || dataIndex === 4) return false;

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
                    {/* Custom expandable row option. Data: {JSON.stringify(rowData)} */}
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
            
            // return (
            //     <Link href='/vendors/create'>  
            //         <Tooltip title="Add new Vendor">
            //             <IconButton>
            //                 <AddIcon  />
            //             </IconButton>
            //         </Tooltip>
            //     </Link>
                
            // );
        }
    }

    const theme = createTheme({
        components: {
            MUIDataTableHeadCell: {
                styleOverrides: {
                    fixedHeader: {
                        backgroundColor: 'gainsboro',
                    },
                },
            },
            MUIDataTableSelectCell: {
                styleOverrides: {
                    headerCell: {
                        backgroundColor: 'gainsboro',
                    },
                },
            },
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        fontSize: '12px',
                    },
                },
            }
        },
    });


    return (
        <>
            <div id="main_content">

                <Sidemenu></Sidemenu>

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
                            <h4>MDU List</h4>
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