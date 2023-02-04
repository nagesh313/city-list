import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { IPageRequest } from "../interfaces/PageRequest";

export const CityListTablePagination = (props: {
  pageRequest: IPageRequest;
  pageChange: any;
  sizeChange: any;
}) => {
  return (
    <TablePagination
      component="div"
      count={props.pageRequest.totalElements}
      page={props.pageRequest.page}
      onPageChange={props.pageChange}
      rowsPerPage={props.pageRequest.pageSize}
      onRowsPerPageChange={props.sizeChange}
    />
  );
};
