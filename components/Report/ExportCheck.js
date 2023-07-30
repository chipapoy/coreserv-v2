import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';
import {Button} from '@mui/material';

const Export = (props) => {

  const datas = [];

  let dataArr = props.data;

  if(dataArr){
    dataArr.map( (r) => (
      datas.push({
        'Vendor': r.vendor_name,
        'Dispatch Date': moment(r.disp_date).format('YYYY-MM-DD'),
        'OR Date': moment(r.or_date).format('YYYY-MM-DD'),
        'Crew': r.crew,
        'Action Taken': r.action_taken,
        'Remarks': r.remarks,
        'Status': r.status,
        'Completion Date': r.completion_date!=null ? moment(r.completion_date).format('YYYY-MM-DD') : '',
        'ABS-CBN Received Date': r.abs_cbn_received_date!=null ? moment(r.abs_cbn_received_date).format('YYYY-MM-DD') : '',
        'ABS-CBN Received By': r.received_by,
        'Vergara Received Date': r.vergara_received_date!=null ? moment(r.vergara_received_date).format('YYYY-MM-DD') : '',
        'Vergara Received By': r.received_by_vergara,
      })
    ));
  }
  

  return (
    <div>
      <CsvDownloader
        filename="Check"
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