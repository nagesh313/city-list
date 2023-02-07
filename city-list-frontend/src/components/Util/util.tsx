import axios from "axios";
import { City } from "../interfaces/City";
import { IPage, IPageRequest } from "../interfaces/PageRequest";
export const getCityList = async (
  page: IPage,
  setPageRequest: React.Dispatch<React.SetStateAction<IPageRequest>>,
  setCityList: React.Dispatch<React.SetStateAction<City[]>>
) => {
  const {
    data: { content, number, numberOfElements, size, totalElements },
  } = await axios.get(
    `/api/v1/city/list?page=${page.page}&&pageSize=${page.pageSize}`
  );
  setPageRequest({
    page: number,
    pageSize: size,
    numberOfElements,
    totalElements,
  });
  setCityList(content);
};
export const getCityListWithSearchString = async (
  page: IPage,
  setPageRequest: React.Dispatch<React.SetStateAction<IPageRequest>>,
  setCityList: React.Dispatch<React.SetStateAction<City[]>>
) => {
  const {
    data: { content, number, numberOfElements, size, totalElements },
  } = await axios.get(
    `/api/v1/city/search?page=${page.page}&&pageSize=${page.pageSize}&&searchString=${page.searchString}`
  );
  setPageRequest({
    page: number,
    pageSize: size,
    numberOfElements,
    totalElements,
  });
  setCityList(content);
};
export const editCity = (
  updatedCity: City,
  enqueueSnackbar: any,
  setOpenEditDialog: any
) => {
  axios
    .put("/api/v1/city/edit", updatedCity)
    .then(() => {
      enqueueSnackbar("City Updated Successfully", successSnackbar);
      setOpenEditDialog(false);
    })
    .catch(() => {
      enqueueSnackbar("Could not Update City!!!", failureSnackbar);
    });
};
const successSnackbar = {
  autoHideDuration: 3000,
  variant: "success",
};
const failureSnackbar = {
  autoHideDuration: 3000,
  variant: "error",
};
