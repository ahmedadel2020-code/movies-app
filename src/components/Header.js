import React, { useCallback } from "react";
import { AppBar, Toolbar, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "transparent",
});

const Header = () => {
  let navigate = useNavigate();

  const handleGoHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h6"
          onClick={handleGoHomePage}
          sx={{ cursor: "pointer" }}
        >
          Movies App
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
