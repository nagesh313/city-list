import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import * as React from "react";
import { City } from "../interfaces/City";
import { CityListTableBody } from "./CityListTableBody";
import { CityListTableHeader } from "./CityListTableHeader";

export const CityListTable = () => {
  const [cityList, setCityList] = React.useState<City[]>([]);
  const getCityList = async () => {
    const {
      data: { content, pageable },
    } = await axios.get("/api/v1/city/list");
    console.log(content);
    console.log(pageable);
    setCityList(content);
  };
  React.useEffect(() => {
    getCityList();
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
