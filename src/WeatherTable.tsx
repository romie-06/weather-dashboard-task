import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { WeatherData } from "./WeatherDashboard";

interface Props {
  data: WeatherData[];
}

const WeatherTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell>Temperature (°F)</TableCell>
            <TableCell>Feels Like (°F)</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Humidity (%)</TableCell>
            <TableCell>Wind Speed (m/s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(city => (
            <TableRow key={city.name}>
              <TableCell>{city.name}</TableCell>
              <TableCell>{city.main.temp}</TableCell>
              <TableCell>{city.main.feels_like}</TableCell>
              <TableCell>{city.weather[0].main}</TableCell>
              <TableCell>{city.main.humidity}</TableCell>
              <TableCell>{city.wind.speed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;
