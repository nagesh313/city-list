import { fireEvent, render, screen } from "@testing-library/react";
import moxios from "moxios";
import React from "react";
import { act } from "react-dom/test-utils";
import { SimpleResponse } from "../../TestData/data";
import { CityListTable } from "./CityListTable";

describe("Test CityListTable", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/v1/city/list?page=0&&pageSize=10", SimpleResponse);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("renders CityListTable after fulfilling API call", async () => {
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

  it("renders CityListTable after searching For a City", async () => {
    const searchText = "test";
    await searchTextFlow(searchText);
    const linkElement = await screen.findByText(searchText);
    expect(linkElement).toBeInTheDocument();
  });

  it("resets CityListTable after click on reset button", async () => {
    const searchText = "test";
    await searchTextFlow(searchText);
    const resetButton = screen.getByRole("button", { name: "Reset" });
    act(() => {
      fireEvent.reset(resetButton, {});
    });
    await Promise.resolve();
    const linkElement = await screen.findByText(/Beijing/i);
    expect(linkElement).toBeInTheDocument();
  });

  const searchTextFlow = async (searchText: string) => {
    const searchResponse = JSON.parse(JSON.stringify(SimpleResponse));
    searchResponse.response.content[0].name = searchText;
    moxios.stubRequest(
      "/api/v1/city/search?page=0&&pageSize=10&&searchString=test",
      searchResponse
    );
    act(() => {
      render(<CityListTable />);
    });
    let linkElement = await screen.findByText(/Beijing/i);
    expect(linkElement).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    act(() => {
      fireEvent.submit(submitButton, {
        target: { searchString: { value: searchText } },
      });
    });
    return linkElement;
  };
});
