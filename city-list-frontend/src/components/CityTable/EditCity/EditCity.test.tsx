import { render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { SimpleResponse } from "../../../TestData/data";
import { EditCityDialog } from "./EditCity";

describe("Test EditCity", () => {
  it("renders EditCityDialog with Right Values", () => {
    const openEditDialog = true;
    const setOpenEditDialog = jest.fn();
    const city = SimpleResponse.response.content[0];
    act(() => {
      render(
        <EditCityDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          city={city}
        />
      );
    });
    const cityNameTextField: any = screen.getByRole("textbox", {
      name: "City Name",
    });
    expect(cityNameTextField).toBeInTheDocument();
    expect(cityNameTextField.value).toEqual(city.name);
    const cityPhotoTextField: any = screen.getByRole("textbox", {
      name: "City Photo",
    });
    expect(cityPhotoTextField).toBeInTheDocument();
    expect(cityPhotoTextField.value).toEqual(city.photo);
  });
});
