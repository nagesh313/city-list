import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import * as React from "react";
import { City } from "../interfaces/City";
import { IPage, IPageRequest } from "../interfaces/PageRequest";
import { CityListTableBody } from "./CityListTableBody";
import { CityListTableHeader } from "./CityListTableHeader";
import { CityListTablePagination } from "./CityListTablePagination";

export const CityListTable = () => {
  const [cityList, setCityList] = React.useState<City[]>([]);
  const [pageRequest, setPageRequest] = React.useState<IPageRequest>({
    page: 0,
    pageSize: 10,
    numberOfElements: 0,
    totalElements: 0,
  });

  const getCityList = async (page: IPage) => {
    const {
      data: { content, number, numberOfElements, size, totalElements },
    } = await axios.get(
      `/api/v1/city/list?page=${page.page}&&pageSize=${page.pageSize}`
    );
    setPageRequest({
      page: number,
      pageSize: size,
      numberOfElements,
      totalElements,
    });
    setCityList(content);
  };

  React.useEffect(() => {
    getCityList(pageRequest);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const pageChangeHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPageNumber: number
  ) => {
    getCityList({ page: newPageNumber, pageSize: pageRequest.pageSize });
  };
  const sizeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    getCityList({
      page: pageRequest.page,
      pageSize: Number(event.target.value),
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <CityListTableHeader />
        <CityListTableBody cityList={cityList} />
      </Table>
      <CityListTablePagination
        pageRequest={pageRequest}
        pageChange={pageChangeHandler}
        sizeChange={sizeChangeHandler}
      />
    </TableContainer>
  );
};
