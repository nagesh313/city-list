import { Typography } from "@mui/material";
import React from "react";

export const Header = (props: { text: string }) => (
  <Typography variant="h4" gutterBottom textAlign="center">
    {props.text}
  </Typography>
);
