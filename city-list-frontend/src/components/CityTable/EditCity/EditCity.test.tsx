import { fireEvent, render, screen } from "@testing-library/react";
import moxios from "moxios";
import React from "react";
import { act } from "react-dom/test-utils";
import { SimpleResponse } from "../../../TestData/data";
import { EditCityDialog } from "./EditCity";

describe("Test EditCity", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("put", "/api/v1/city/edit?page=0&&pageSize=10", {});
  });
  afterEach(() => {
    moxios.uninstall();
  });
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

  it("renders saves the Edited Values in the backed", async () => {
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
    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.submit(buttons[0], {
        target: {
          cityName: { value: "newCityName" },
          cityPhoto: { value: "newCityPhoto" },
        },
      });
    });
    const request = moxios.requests.mostRecent();
    expect(JSON.parse(request.config.data).name).toEqual("newCityName");
    expect(JSON.parse(request.config.data).photo).toEqual("newCityPhoto");
  });
});
