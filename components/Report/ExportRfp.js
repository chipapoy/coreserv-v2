import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';
import {Button} from '@mui/material';

const Export = (props) => {

  const datas = [];

  let fileName = "RFP-" + props.rfpType;

  let dataArr = props.data;

  if(dataArr){
    dataArr.map( (r) => (
      
      datas.push({
        'Vendor': r.vendor_name,
        'Bldg': r.bldg_name,
        'Address': r.address,
        'Contact#': r.contact_num,
        'TIN#': r.tin_num,
        'Vendor Code': r.vendor_code,
        'Contact Person': r.contact_person,
        'Contact #': r.contact_number,
        'Email Address': r.email_add,
        'Internal Order 1': r.internal_order1,
        'Internal Order 2': r.internal_order2,
        'City': r.city,
        'Account': r.account,
        'RFP Type': r.rfp_type,
        'RFP Type': r.rfp_type,
        'Bill Period': r.bill_period,
        'Bill Month': r.bill_month,
        'Current Reading': r.current_reading,
        'Previous Reading': r.previous_reading,
        'Consumption': r.consumption,
        'Rate': r.rate,
        'Amount': r.amount,
        'VAT Amount': r.vat_amount,
        'Interest': r.interest,
        'Penalty': r.penalty,
        'Penalty over Interest VAT Amount': r.penalty_over_interest_vat_amount,
        'Surcharge': r.surcharge,
        'Miscellaneuos': r.miscellaneuos,
        'Total Amount': r.total_amount,
        'Date Bill Received': r.date_bill_received!=null ? moment(r.date_bill_received).format('YYYY-MM-DD') : '',
        'Due Date': r.due_date!=null ? moment(r.due_date).format('YYYY-MM-DD') : '',
        'RFP Date': r.rfp_date!=null ? moment(r.rfp_date).format('YYYY-MM-DD') : ''
      })
    ));
  }
  

  return (
    <div>
      <CsvDownloader
        filename={fileName}
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