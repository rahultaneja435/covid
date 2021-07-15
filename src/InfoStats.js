import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./infostats.css";

function Infostats({ title, cases, isRed, totalCases, ...props }) {
  return (
    <Card onClick={props.onClick} className="Infostats">
      <CardContent>
        <Typography className="info_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`info_cases ${!isRed && "info_cases--green"}`}>
          {cases}
        </h2>
        <Typography className="info_totalcases">total:{totalCases}</Typography>
      </CardContent>
    </Card>
  );
}

export default Infostats;
