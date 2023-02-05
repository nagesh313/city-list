import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Search } from "./Search";

describe("Test Search", () => {
  it("renders All controls of Search Component", () => {
    const handleSearch = jest.fn();
    const handleReset = jest.fn();
    act(() => {
      render(<Search handleSearch={handleSearch} handleReset={handleReset} />);
    });
    const searchField = screen.getByRole("textbox");
    const buttons = screen.getAllByRole("button");
    expect(searchField).toBeInTheDocument();
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    expect(searchField).toHaveAttribute("name", "searchString");
    expect(buttons[0]).toHaveAttribute("name", "submitButton");
    expect(buttons[1]).toHaveAttribute("name", "resetButton");
  });
  it("triggers the handlers on button click", () => {
    const handleSearch = jest.fn();
    const handleReset = jest.fn();
    act(() => {
      render(<Search handleSearch={handleSearch} handleReset={handleReset} />);
    });
    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.submit(buttons[0], {
        target: { searchString: { value: "searchStringValue" } },
      });
    });
    expect(handleSearch.mock.calls).toHaveLength(1);
    expect(handleSearch.mock.calls[0][0]).toEqual("searchStringValue");
    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(handleReset.mock.calls).toHaveLength(1);
  });
});
