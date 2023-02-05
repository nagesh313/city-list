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
import { Search } from "./Search/Search";
export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_NUMBER_OF_ELEMENTS = 0;
export const DEFAULT_TOTAL_ELEMENTS = 0;
export const CityListTable = () => {
  const [cityList, setCityList] = React.useState<City[]>([]);
  const [pageRequest, setPageRequest] = React.useState<IPageRequest>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    numberOfElements: DEFAULT_NUMBER_OF_ELEMENTS,
    totalElements: DEFAULT_TOTAL_ELEMENTS,
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
  const getCityListWithSearchString = async (page: IPage) => {
    const {
      data: { content, number, numberOfElements, size, totalElements },
    } = await axios.get(
      `/api/v1/city/search?page=${page.page}&&pageSize=${page.pageSize}&&searchString=${page.searchString}`
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
  const handleSearch = (searchString: any) => {
    getCityListWithSearchString({
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      searchString,
    });
  };
  const handleReset = () => {
    getCityList({ page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE });
  };

  return (
    <>
      <Search handleSearch={handleSearch} handleReset={handleReset} />
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
    </>
  );
};
