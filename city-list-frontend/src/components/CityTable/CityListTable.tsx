import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import { City } from "../interfaces/City";
import { CityListTableBody } from "./CityListTableBody";
import { CityListTableHeader } from "./CityListTableHeader";

export const CityListTable = () => {
  const [cityList, setCityList] = React.useState<City[]>([]);
  React.useEffect(() => {
    setCityList([{ id: 1, name: "Test Name", photo: "Test Photo" }]); //TODO: Replace this with an API call from the backend
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <CityListTableHeader />
        <CityListTableBody cityList={cityList} />
      </Table>
    </TableContainer>
  );
};
