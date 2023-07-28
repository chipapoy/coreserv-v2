import Link from 'next/link';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  List,ListItem,ListItemText,Divider,Grid,Stack,
  Button,ButtonGroup,Box,Tabs,Tab,Typography,Input,
  TextField,FormControl,InputAdornment
} from '@mui/material';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Settings = () => {

  let tableHeaderColor = 'wheat';

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead sx={{ backgroundColor: tableHeaderColor }}>
              <TableRow>
                <TableCell colSpan={3}>CALLBACK STATUS List</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rowsDispatch.map((row) => (
                <TableRow
                  key={row.status}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.status}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  )

}

export default Settings