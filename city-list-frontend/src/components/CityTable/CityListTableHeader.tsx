import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

export const CityListTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell align="left">ID</TableCell>
      <TableCell align="center">Name</TableCell>
      <TableCell align="center">Photo</TableCell>
      <TableCell align="center">Edit</TableCell>
    </TableRow>
  </TableHead>
);
