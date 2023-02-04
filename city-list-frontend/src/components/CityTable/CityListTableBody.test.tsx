import { render, screen } from "@testing-library/react";
import React from "react";
import { CityListTableBody } from "./CityListTableBody";

test("renders CityListTableBody Component", () => {
  render(
    <CityListTableBody
      cityList={[{ id: 1, name: "test-name", photo: "test-photo" }]}
    />
  );
  let linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/test-name/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/test-photo/i);
  expect(linkElement).toBeInTheDocument();
});
