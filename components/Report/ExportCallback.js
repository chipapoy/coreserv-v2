import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';
import {Button} from '@mui/material';

const Export = (props) => {

  const datas = [];

  let dataArr = props.data;

  if(dataArr){
    dataArr.map( (r) => (
      
      datas.push({
        'Callback Date': moment(r.callback_date).format('YYYY-MM-DD'),
        'OMT Tracking #': r.omt_tracking_num,
        'Vendor': r.vendor_name,
        'Status': r.callback_status,
        'Attempt': r.attempt_count,
        'Start': moment(r.start).format('YYYY-MM-DD HH:mm'),
        'End': moment(r.end).format('YYYY-MM-DD HH:mm'),
        'AHT': r.aht.slice(0,-3),
        'Agent': r.agent,
        'Preffered Date': r.preferred_date!=null ? moment(r.preferred_date).format('YYYY-MM-DD') : '',
      })
    ));
  }
  

  return (
    <div>
      <CsvDownloader
        filename="Callback"
        extension=".csv"
        separator=","
        wrapColumnChar='"'
        meta={true}
        datas={datas}
      >
        <Button 
          disableElevation
          size='small'
          variant="contained" 
          color="primary"
          disabled={ dataArr ? (dataArr.length == 0 ? true : false) : true }
        >Export Raw</Button>
      </CsvDownloader>
    </div>
  );

}



export default Export