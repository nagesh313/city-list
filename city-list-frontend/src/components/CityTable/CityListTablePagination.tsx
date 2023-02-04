import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { PageRequest } from "../interfaces/PageRequest";

export const CityListTablePagination = (props: {
  pageRequest: PageRequest;
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
