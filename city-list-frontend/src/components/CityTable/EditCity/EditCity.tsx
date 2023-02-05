import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";

export const EditCityDialog = (props: {
  openEditDialog: any;
  setOpenEditDialog: any;
  city: any;
}) => {
  const handleClose = () => {
    props.setOpenEditDialog(false);
  };
  const onSubmit = () => {
    props.setOpenEditDialog(false);
  };
  const onReset = () => {
    props.setOpenEditDialog(false);
  };
  return (
    <Dialog open={props.openEditDialog} onClose={handleClose}>
      <DialogTitle textAlign="center">Edit City</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} onReset={onReset}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item margin="dense">
              <TextField
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};
