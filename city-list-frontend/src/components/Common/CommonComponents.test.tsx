import { render, screen } from "@testing-library/react";
import React from "react";
import { Header } from "./CommonComponents";

test("renders Header Component", () => {
  render(<Header text="test Header" />);
  const linkElement = screen.getByText(/test Header/i);
  expect(linkElement).toBeInTheDocument();
});
