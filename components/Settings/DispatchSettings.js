import {Grid} from '@mui/material';
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
import RemarksTable from "../../components/Settings/Tables/RemarksTable";
import StatusTable from "../../components/Settings/Tables/StatusTable";
import DispTypeTable from "../../components/Settings/Tables/DispTypeTable";

const Settings = () => {

  let tableHeaderColor = 'wheat';

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <RemarksTable />
      </Grid>

      <Grid item xs={6}>
        <StatusTable />
      </Grid>

      <Grid item xs={6}>
        <DispTypeTable />
      </Grid>

    </Grid>

  )

}

export default Settings