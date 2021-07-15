import React from "react";
import "./table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((resp) => (
        <tr>
          <td>{resp.country}</td>
          <td>
            <strong>{numeral(resp.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
