import { render, screen } from "@testing-library/react";
import moxios from "moxios";
import React from "react";
import { act } from "react-dom/test-utils";
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
    moxios.stubRequest("/api/v1/city/list?page=0&&pageSize=10", SimpleResponse);
    act(() => {
      render(<CityListTable />);
    });
    let linkElement = await screen.findByText(/111111/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/Beijing/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByAltText(
      "city-" + SimpleResponse.response.content[0].id
    );
    expect(linkElement).toBeInTheDocument();
  });
});
