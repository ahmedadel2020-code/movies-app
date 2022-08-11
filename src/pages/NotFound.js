import { Container, styled, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const StyledContainer = styled(Container)({
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const NotFound = () => {
  return (
    <StyledContainer>
      <ErrorIcon sx={{ mb: 2, color: "red" }} fontSize="large" />
      <Typography sx={{ fontSize: "35px" }}>Page Not Found</Typography>
    </StyledContainer>
  );
};

export default NotFound;
