import './App.css';
import { MenuItem,FormControl,Select, Card, CardContent} from '@material-ui/core';
import Infostats from './InfoStats'
import { useEffect, useState } from 'react';
import Table from './Table'
import { preetyFormat, sortedData } from './util';
import CovidMaps from './CovidMaps';
import "leaflet/dist/leaflet.css";
// import Struct from './Struct';

//"https://disease.sh/v3/covid-19/all"
// https://disease.sh/v3/covid-19/countries
// "https://disease.sh/v3/covid-19/{countries}"
function App() {
  const [countries,setCountries] = useState([]);
  const [singleCountry,setCountry] = useState('Worldwide');
  const [countryInfo,setcountyInfo] = useState([]);
  const [tableinfo,setTableData] = useState([]);
  const [mapCountries,setMapcointries] = useState([]);
  const [infoStatesData,setInfoStatesData] = useState("cases");
  const [mapCenter,setMapCenter]= useState({lat:34,lng:-40})
  const [mapZoom,setMapZoom]= useState(3);
  
  useEffect(()=>
  {
     fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>
      {
        setcountyInfo(data);
      })
  },[])
  useEffect(()=>
  {
    const getCountrydata = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        const countries = data.map((covidResponse)=>
        ({
          name : covidResponse.country,
          value : covidResponse.countryInfo.iso2
        }));
        setMapcointries(data);
        const sortedDataresponse = sortedData(data)
        setTableData(sortedDataresponse);
        setCountries(countries);
      });
    };
    getCountrydata();
  },[])

  const onCountryChange = async (event)=>
  { 
    const countryCode = event.target.value;
    const url = countryCode==='Worldwide' ? "https://disease.sh/v3/covid-19/all" 
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response=>response.json())
    .then(data=>
      {
        setCountry(countryCode)
        setcountyInfo(data);
        console.log("data",countryInfo);
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
        console.log("mapp",mapCountries);
        setMapZoom(4);
      })

  }
  return (
    <div className="App">
      <div className="container_left">
      <div className="app_header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app_selectOptions">
       <Select variant = "outlined" onChange = {onCountryChange} value={singleCountry}>
      <MenuItem value="Worldwide">Worldwide</MenuItem>
      {countries.map(response=>(
        <MenuItem value ={response.value}>{response.name}</MenuItem>
      ))}
       </Select>
      </FormControl>
      </div>
      <div className = "app_infos">
      <Infostats isRed onClick={e=>setInfoStatesData("cases")} title="Corona Virus Cases" totalCases={preetyFormat(countryInfo.cases)} cases={preetyFormat(countryInfo.todayCases)}/>
      <Infostats  onClick={e=>setInfoStatesData("recovered")}title="Recovered Cases" totalCases={preetyFormat(countryInfo.recovered)} cases={preetyFormat(countryInfo.todayRecovered)}/>
      <Infostats isRed onClick={e=>setInfoStatesData("deaths")}title="Deaths" totalCases={preetyFormat(countryInfo.deaths)} cases={preetyFormat(countryInfo.todayDeaths)}/>
      </div>
      <div className="Maps">
      <CovidMaps
        centerData={mapCenter}
        zoomData ={mapZoom}
        countryResponse={mapCountries}
        casesType={infoStatesData}
      />
      </div>
      </div>
      <Card className="container_right">
        <CardContent>
          <h2>Live Cases by country</h2>
          <Table countries= {tableinfo}/>
          {/* <Struct/> */}
       </CardContent>
       <CardContent>
          <Infostats isRed title="Covid tests per million" totalCases={preetyFormat(countryInfo.tests)} cases={preetyFormat(countryInfo.testsPerOneMillion)}/>
       </CardContent>
      </Card>
      
      {/* header + dropdown */}
      {/* 3 infoboxes */}
      {/* table*/}
      {/* graph*/}
      {/* map*/}
    </div>
  );
}

export default App;