import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { City } from "../interfaces/City";
import { EditCityDialog } from "./EditCity/EditCity";
export const CityListTableBody = (props: { cityList: City[] }) => {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [city, setCity] = React.useState({});
  return (
    <div>
      <EditCityDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        city={city}
      />
      <TableBody>
        {props.cityList.map((row: City) => (
          <TableRow key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">
              <img
                src={row.photo}
                style={{ maxHeight: "50px" }}
                alt={`city-${row.id}`}
              ></img>
            </TableCell>
            <TableCell align="center">
              <IconButton
                color="primary"
                aria-label="Edit City"
                component="label"
                id={`city-edit-${row.id}`}
                onClick={() => {
                  setOpenEditDialog(true);
                  setCity(row);
                }}
              >
                <Edit />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
};
