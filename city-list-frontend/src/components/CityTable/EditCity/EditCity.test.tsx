import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { SimpleResponse } from "../../../TestData/data";
import { EditCityDialog } from "./EditCity";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Test EditCity", () => {
  beforeEach(() => {
    mockedAxios.put.mockResolvedValue({ data: { ...SimpleResponse.response } });
    mockedAxios.get.mockResolvedValue({ data: { ...SimpleResponse.response } });
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
          updatePage={jest.fn()}
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
    const updateCityAction = jest.fn();
    act(() => {
      render(
        <EditCityDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          city={city}
          updatePage={updateCityAction}
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
    const mockCallData: any = mockedAxios.put.mock.calls[0][1];
    expect(mockCallData.name).toEqual("newCityName");
    expect(mockCallData.photo).toEqual("newCityPhoto");
    expect(updateCityAction).toHaveBeenCalled();
  });
  it("should test Cancel button", async () => {
    const openEditDialog = true;
    const setOpenEditDialog = jest.fn();
    const city = SimpleResponse.response.content[0];
    act(() => {
      render(
        <EditCityDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          city={city}
          updatePage={jest.fn()}
        />
      );
    });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    act(() => {
      fireEvent.click(cancelButton, {});
    });
    expect(setOpenEditDialog).toHaveBeenCalledWith(false);
  });
});
