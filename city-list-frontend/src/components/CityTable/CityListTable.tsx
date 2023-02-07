import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import { City } from "../interfaces/City";
import { IPageRequest } from "../interfaces/PageRequest";
import { getCityList, getCityListWithSearchString } from "../Util/util";
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

  React.useEffect(() => {
    getCityList(pageRequest, setPageRequest, setCityList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const pageChangeHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPageNumber: number
  ) => {
    getCityList(
      { page: newPageNumber, pageSize: pageRequest.pageSize },
      setPageRequest,
      setCityList
    );
  };
  const sizeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    getCityList(
      { page: pageRequest.page, pageSize: Number(event.target.value) },
      setPageRequest,
      setCityList
    );
  };
  const handleSearch = (searchString: any) => {
    getCityListWithSearchString(
      {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        searchString,
      },
      setPageRequest,
      setCityList
    );
  };
  const handleReset = () => {
    getCityList(
      { page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE },
      setPageRequest,
      setCityList
    );
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
