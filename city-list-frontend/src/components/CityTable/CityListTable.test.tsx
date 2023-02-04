import { render, screen } from "@testing-library/react";
import React from "react";
import { CityListTable } from "./CityListTable";

test("renders CityListTable", () => {
  render(<CityListTable />);
  let linkElement = screen.getByText(/Test Name/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Test Photo/i);
  expect(linkElement).toBeInTheDocument();
});
