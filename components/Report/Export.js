import CsvDownloader from 'react-csv-downloader';
import moment from 'moment';

const Export = (props) => {

  // const columns = [
  //   {
  //     id: 'first',
  //     displayName: 'First column'
  //   }, {
  //     id: 'second',
  //     displayName: 'Second column'
  //   }
  // ];

  // const datas = [{
  //   first: 'foo',
  //   second: 'bar'
  // }, {
  //   first: 'foobar',
  //   second: 'foobar'
  // }];

  const datas = [];

  let dataArr = props.data;

  dataArr.map( (r) => (
    datas.push({
      'Vendor': r.vendor_name,
      'Dispatch Date': moment(r.disp_date).format('YYYY-MM-DD')
    })
  ));

  

  return (
    <div>
      <CsvDownloader
        filename="myfile"
        extension=".csv"
        separator=","
        wrapColumnChar=""
        datas={datas}
      >{props.children}
      </CsvDownloader>
    </div>
  );

}



export default Export