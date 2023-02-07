import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { act } from "react-dom/test-utils";
import { SimpleResponse } from "../../TestData/data";
import { CityListTable } from "./CityListTable";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test CityListTable", () => {
  beforeEach(() => {
    mockedAxios.put.mockResolvedValue({ data: { ...SimpleResponse.response } });
    mockedAxios.get.mockResolvedValue({ data: { ...SimpleResponse.response } });
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
    const searchResponse = JSON.parse(JSON.stringify(SimpleResponse));
    searchResponse.response.content[0].name = searchText;
    mockedAxios.get.mockResolvedValue({ data: { ...searchResponse.response } });
    act(() => {
      render(<CityListTable />);
    });
    let linkElement = await screen.findByText(/test/i);
    mockedAxios.put.mockResolvedValue({ data: { ...SimpleResponse.response } });
    const resetButton = screen.getByRole("button", { name: "Reset" });
    act(() => {
      fireEvent.reset(resetButton, {});
    });
    linkElement = await screen.findByText(/111111/i);
    expect(linkElement).toBeInTheDocument();
  });

  const searchTextFlow = async (searchText: string) => {
    const searchResponse = JSON.parse(JSON.stringify(SimpleResponse));
    searchResponse.response.content[0].name = searchText;
    mockedAxios.get.mockResolvedValue({ data: { ...searchResponse.response } });
    act(() => {
      render(<CityListTable />);
    });
    let linkElement = await screen.findByText(/test/i);
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
