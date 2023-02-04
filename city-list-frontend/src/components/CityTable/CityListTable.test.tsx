import { render, screen } from "@testing-library/react";
import moxios from "moxios";
import React from "react";
import { SimpleResponse } from "../../TestData/data";
import { CityListTable } from "./CityListTable";

describe("Test CityListTable", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("renders CityListTable after fulfilling API call", async () => {
    moxios.stubRequest("/api/v1/city/list", SimpleResponse);
    render(<CityListTable />);
    let linkElement = await screen.findByText(/11/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/Beijing/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByAltText(
      "city-" + SimpleResponse.response.content[0].id
    );
    expect(linkElement).toBeInTheDocument();
  });
});
