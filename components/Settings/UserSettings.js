import {Grid} from '@mui/material';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import UserTable from "../../components/Settings/Tables/UserTable";
import UserTypeTable from "../../components/Settings/Tables/UserTypeTable";
import CrewTable from "../../components/Settings/Tables/CrewTable";

const Settings = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <UserTable />
      </Grid>
      <Grid item xs={6}>
        <UserTypeTable />
      </Grid>
      <Grid item xs={6}>
        <CrewTable />
      </Grid>
    </Grid>
  )

}

export default Settings