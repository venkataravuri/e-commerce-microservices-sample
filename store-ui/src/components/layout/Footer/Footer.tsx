import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { render } from "@testing-library/react";
function Footer() {
  return (
    <footer className="footer">
      <Paper style={{ backgroundColor: "#e0e0e0" }}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.secondary",
            fontSize: 16,
            p: 1,
            width: "100%", // Keep this line
          }}
        >
          <Grid container sx={{ mb: 1, p: 1 }} justifyContent="space-between">
            <Grid
              item
              xs={8}
              spacing={2}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>Contact Us</Grid>
              <Grid item>About Us</Grid>
              <Grid item>Terms Of Use</Grid>
              <Grid item>Privacy</Grid>
            </Grid>
            <Grid
              item
              xs={4}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              Copyright © 2024 aingface All rights reserved.
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </footer>
  );
}

export default Footer;
