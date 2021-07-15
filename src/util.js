import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const preetyFormat = (dta) => {
  const a = dta ? `+${numeral(dta).format("0.0a")}` : null;
  return a;
};
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#6a5d5d",
    multiplier: 800,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1500,
  },
};
export const sortedData = (data) => {
  const sortedData1 = [...data];
  sortedData1.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData1;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}
export const mappedData = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popname">
          <div
            className="flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="countryName">{country.country}</div>
          <div className="popDatatotal">
            Total cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="popDatarecovered">
            Total Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="popDatadeaths">
            Total Deaths:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
