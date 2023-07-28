import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';
import {Button} from '@mui/material';

const Export = (props) => {

  const datas = [];

  let dataArr = props.data;

  if(dataArr){
    dataArr.map( (r) => (
      
      datas.push({
        'OTD Date': moment(r.otd_date).format('YYYY-MM-DD'),
        'OMT Tracking #': r.omt_tracking_num,
        'Vendor': r.vendor_name,
        'Concern': r.concern,
        'Crew': r.crew,
        'Start': moment(r.start).format('YYYY-MM-DD HH:mm'),
        'End': moment(r.end).format('YYYY-MM-DD HH:mm'),
        'AHT': r.aht.slice(0,-3)
      })
    ));
  }
  

  return (
    <div>
      <CsvDownloader
        filename="OTD"
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
          children="Export Raw"
          disabled={ dataArr ? (dataArr.length == 0 ? true : false) : true }
        />
      </CsvDownloader>
    </div>
  );

}



export default Export