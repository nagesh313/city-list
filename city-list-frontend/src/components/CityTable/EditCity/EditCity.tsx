import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";
import { City } from "../../interfaces/City";

export const EditCityDialog = (props: {
  openEditDialog: any;
  setOpenEditDialog: any;
  city: any;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    props.setOpenEditDialog(false);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    const updatedCityData = {
      id: props.city.id,
      name: event.target["cityName"].value,
      photo: event.target["cityPhoto"].value,
    };
    updateCity(updatedCityData);
  };
  const updateCity = (updatedCity: City) => {
    axios
      .put("/api/v1/city/edit", updatedCity)
      .then(() => {
        enqueueSnackbar("City Updated Successfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        props.setOpenEditDialog(false);
      })
      .catch(() => {
        enqueueSnackbar("Could not Update City!!!", {
          autoHideDuration: 3000,
          variant: "error",
        });
      });
  };
  return (
    <Dialog open={props.openEditDialog} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle textAlign="center">Edit City</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item margin="dense">
              <TextField
                required
                size="small"
                margin="dense"
                id="city-name"
                name="cityName"
                label="City Name"
                defaultValue={props.city.name}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                margin="dense"
                id="city-photo"
                name="cityPhoto"
                label="City Photo"
                type="url"
                defaultValue={props.city.photo}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
