import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

export const Search = (props: { handleSearch: any; handleReset: any }) => {
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSearch(event.target["searchString"].value);
  };
  const onReset = () => {
    props.handleReset();
  };
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            id="search-string"
            label="Search"
            name="searchString"
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            name="submitButton"
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="reset"
            variant="outlined"
            size="small"
            name="resetButton"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
