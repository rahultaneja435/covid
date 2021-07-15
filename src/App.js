import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Infostats from "./InfoStats";
import { useEffect, useState } from "react";
import Table from "./Table";
import { preetyFormat, sortedData } from "./util";
import Modal from "@material-ui/core/Modal";
import CovidMaps from "./CovidMaps";
import { makeStyles } from "@material-ui/core/styles";
import "leaflet/dist/leaflet.css";
import Struct from "./Struct";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [countries, setCountries] = useState([]);
  const [singleCountry, setCountry] = useState("Worldwide");
  const [countryInfo, setcountyInfo] = useState([]);
  const [tableinfo, setTableData] = useState([]);
  const [mapCountries, setMapcointries] = useState([]);
  const [infoStatesData, setInfoStatesData] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40 });
  const [mapZoom, setMapZoom] = useState(3);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className="styler">
      <h2 id="simple-modal-title">Covid Line Graph</h2>
      <Struct casesType={infoStatesData} />
    </div>
  );

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountyInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountrydata = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((covidResponse) => ({
            name: covidResponse.country,
            value: covidResponse.countryInfo.iso2,
          }));
          setMapcointries(data);
          const sortedDataresponse = sortedData(data);
          setTableData(sortedDataresponse);
          setCountries(countries);
        });
    };
    getCountrydata();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setcountyInfo(data);
        console.log("data", countryInfo);
        setMapCenter([
          data.countryInfo.lat ? data.countryInfo.lat : 34,
          data.countryInfo.long,
        ]);
        console.log("mapp", mapCountries);
        setMapZoom(4);
      });
  };
  return (
      <div className="App">
        <div className="container_left">
          <div className="app_header">
            <h1>Covid-19 Tracker</h1>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
            <button class="btn" onClick={handleOpen}>
              Click here to see Graph
            </button>
            <FormControl className="app_selectOptions">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={singleCountry}
              >
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((response) => (
                  <MenuItem value={response.value}>{response.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app_infos">
            <Infostats
              isRed
              onClick={(e) => setInfoStatesData("cases")}
              title="Corona Virus Cases"
              totalCases={preetyFormat(countryInfo.cases)}
              cases={preetyFormat(countryInfo.todayCases)}
            />
            <Infostats
              onClick={(e) => setInfoStatesData("recovered")}
              title="Recovered Cases"
              totalCases={preetyFormat(countryInfo.recovered)}
              cases={preetyFormat(countryInfo.todayRecovered)}
            />
            <Infostats
              isRed
              onClick={(e) => setInfoStatesData("deaths")}
              title="Deaths"
              totalCases={preetyFormat(countryInfo.deaths)}
              cases={preetyFormat(countryInfo.todayDeaths)}
            />
          </div>
          <div className="Maps">
            <CovidMaps
              centerData={mapCenter}
              zoomData={mapZoom}
              countryResponse={mapCountries}
              casesType={infoStatesData}
            />
          </div>
        </div>
        <Card className="container_right">
          <CardContent>
            <h2>Live Cases by country</h2>
            <Table countries={tableinfo} />
            {/* <Struct/> */}
          </CardContent>
          <CardContent>
            <Infostats
              isRed
              title="Covid tests per million"
              totalCases={preetyFormat(countryInfo.tests)}
              cases={preetyFormat(countryInfo.testsPerOneMillion)}
            />
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
