import CsvDownloader from 'react-csv-downloader';

const exportTest = () => {

  const columns = [
    {
      id: 'first',
      displayName: 'First column'
    }, {
      id: 'second',
      displayName: 'Second column'
    }
  ];

  const datas = [{
    first: 'foo',
    second: 'bar'
  }, {
    first: 'foobar',
    second: 'foobar'
  }];

  return (
    <div>
      <CsvDownloader
        filename="myfile"
        extension=".csv"
        separator=","
        wrapColumnChar=""
        datas={datas}
        text="DOWNLOAD" />
    </div>
  );

}



export default exportTest