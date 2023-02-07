import { SimpleResponse } from "../../TestData/data";
import { editCity, getCityList, getCityListWithSearchString } from "./util";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Test Util", () => {
  let page: any;
  let setPageRequest: jest.Mock<any, any>;
  let setCityList: jest.Mock<any, any>;
  beforeEach(() => {
    page = { page: 0, pageSize: 10 };
    setPageRequest = jest.fn();
    setCityList = jest.fn();
    mockedAxios.put.mockResolvedValue({ data: { ...SimpleResponse.response } });
    mockedAxios.get.mockResolvedValue({ data: { ...SimpleResponse.response } });
  });
  test("should test getCityList", async () => {
    await getCityList(page, setPageRequest, setCityList);
    expect(setPageRequest.mock.calls).toHaveLength(1);
    expect(setCityList.mock.calls).toHaveLength(1);
  });
  test("should test getCityListWithSearchString", async () => {
    await getCityListWithSearchString(page, setPageRequest, setCityList);
    expect(setPageRequest.mock.calls).toHaveLength(1);
    expect(setCityList.mock.calls).toHaveLength(1);
  });

  test("should test editCity", async () => {
    const updatedCity: any = jest.fn();
    const enqueueSnackbar = jest.fn();
    const setOpenEditDialog = jest.fn();
    await editCity(updatedCity, enqueueSnackbar, setOpenEditDialog);
    expect(enqueueSnackbar.mock.calls).toHaveLength(1);
    expect(setOpenEditDialog.mock.calls).toHaveLength(1);
    expect(setOpenEditDialog.mock.calls[0][0]).toEqual(false);
  });
});
