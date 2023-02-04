import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders City List App", () => {
  render(<App />);
  const linkElement = screen.getByText(/City List/i);
  expect(linkElement).toBeInTheDocument();
});
