import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { City } from "../interfaces/City";
export const CityListTableBody = (props: { cityList: City[] }) => {
  return (
    <TableBody>
      {props.cityList.map((row: City) => (
        <TableRow key={row.id}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.photo}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
