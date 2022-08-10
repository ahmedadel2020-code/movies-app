import React from "react";
import { AppBar, Toolbar, styled, Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#321639",
});

const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">Movies App</Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
