import React, { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  borderRadius: "20px",
  position: "relative",
  cursor: "pointer",
  maxWidth: "100%",

  "&:hover img": {
    transition: "all 0.5s ease",
    opacity: 0.3,
  },
  "&:hover button": {
    opacity: 1,
    transition: "all 0.5s ease",
  },
});

const StyledBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const StyledButton = styled(Button)({
  opacity: 0,
  backgroundColor: "#dd003f",
  padding: "8px 15px",
  borderRadius: "20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#9a5a6c",
  },
});

const MovieCard = ({ movie }) => {
  const [visisble, setVisible] = useState(false);
  const imageOriginalUrl = "https://image.tmdb.org/t/p/original";
  let navigate = useNavigate();

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const handleNavigateToMovieDetails = useCallback(() => {
    navigate(`/details/${movie.id}`);
  }, [movie, navigate]);

  return (
    <StyledCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="card"
    >
      <CardMedia
        component="img"
        image={imageOriginalUrl + movie.poster_path}
        alt={movie.title}
      />
      <StyledBox>
        {visisble && (
          <StyledButton
            variant="contained"
            onClick={handleNavigateToMovieDetails}
          >
            Details
          </StyledButton>
        )}
      </StyledBox>
    </StyledCard>
  );
};

export default MovieCard;
