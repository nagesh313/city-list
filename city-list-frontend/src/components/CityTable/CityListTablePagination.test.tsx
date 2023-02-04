import { render, screen } from "@testing-library/react";
import React from "react";
import { CityListTablePagination } from "./CityListTablePagination";
import { PageRequest } from "../interfaces/PageRequest";
import { fireEvent, getByText, getByTitle, within } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
describe("Test CityListTablePagination", () => {
  const pageRequest: PageRequest = {
    page: 0,
    pageSize: 10,
    numberOfElements: 100,
    totalElements: 1000,
  };
  let pageChangeMock = jest.fn();
  let sizeChangeMock = jest.fn();
  afterEach(() => {
    pageChangeMock.mockClear();
    sizeChangeMock.mockClear();
  });
  it("renders CityListTablePagination Component", () => {
    act(() => {
      render(
        <CityListTablePagination
          pageRequest={pageRequest}
          pageChange={pageChangeMock}
          sizeChange={sizeChangeMock}
        />
      );
    });

    let linkElement: any = screen.getByText(/Rows per page/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/1–10 of 1000/i);
    expect(linkElement).toBeInTheDocument();

    const data = document.getElementsByClassName("MuiSelect-select");
    expect(data[0].innerHTML).toEqual("10");
  });
  it("should call handle change events", async () => {
    act(() => {
      render(
        <CityListTablePagination
          pageRequest={pageRequest}
          pageChange={pageChangeMock}
          sizeChange={sizeChangeMock}
        />
      );
    });
    const input = screen.getByTitle("Go to next page");
    act(() => {
      fireEvent(
        input,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    expect(pageChangeMock.mock.calls).toHaveLength(1);
    expect(pageChangeMock.mock.calls[0][1]).toEqual(pageRequest.page + 1);
    const data = document.getElementsByClassName("MuiSelect-nativeInput");
    act(() => {
      fireEvent(
        data[0],
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    const data1 = document.getElementsByClassName("MuiSelect-standard");
    //TODO : Finish this event as well
    act(() => {
      fireEvent(
        data1[0],
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
  });
});
