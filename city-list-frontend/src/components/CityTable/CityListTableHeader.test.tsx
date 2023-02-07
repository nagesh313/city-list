import { Table } from "@mui/material";
import { render, screen } from "@testing-library/react";
import React from "react";
import { CityListTableHeader } from "./CityListTableHeader";

test("renders CityListTableHeader Component", () => {
  render(
    <Table>
      <CityListTableHeader />
    </Table>
  );
  let linkElement = screen.getByText(/ID/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Name/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Photo/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText(/Edit/i);
  expect(linkElement).toBeInTheDocument();
});
