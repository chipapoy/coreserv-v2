import {Grid} from '@mui/material';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import CityTable from "../../components/Settings/Tables/CityTable";
import TierTable from "../../components/Settings/Tables/TierTable";
import AccountTable from "../../components/Settings/Tables/AccountTable";
import AccountTypeTable from "../../components/Settings/Tables/AccountTypeTable";
import TermsTable from "../../components/Settings/Tables/TermsTable";
import SoaTypeTable from "../../components/Settings/Tables/SoaTypeTable";
import SkyContactTable from "../../components/Settings/Tables/SkyContactTable";

const Settings = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CityTable />
      </Grid>
      <Grid item xs={6}>
        <TierTable />
      </Grid>

      <Grid item xs={6}>
        <AccountTable />
      </Grid>

      <Grid item xs={6}>
        <AccountTypeTable />
      </Grid>

      <Grid item xs={6}>
        <TermsTable />
      </Grid>

      <Grid item xs={6}>
        <SoaTypeTable />
      </Grid>

      <Grid item xs={6}>
        <SkyContactTable />
      </Grid>

    </Grid>

  )

}

export default Settings