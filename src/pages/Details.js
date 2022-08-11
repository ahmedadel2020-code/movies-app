import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledCard = styled(Card)({
  height: "100vh",
  opacity: "0.2",
  position: "relative",
});

const StyledCardMedia = styled(CardMedia)({
  height: "100%",
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

const InnerCardMedia = styled(CardMedia)({
  width: "250px",
  height: "400px",
  borderRadius: "25px",
});

const StyledBox = styled(Box)({
  marginLeft: "40px",
});

const StyledTypography = styled(Typography)({
  fontSize: "33px",
  color: "white",
  marginBottom: "10px",
});

const StyledChip = styled(Chip)({
  color: "white",
  marginRight: "8px",
  marginBottom: "40px",
  cursor: "pointer",
  letterSpacing: "1px",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
});

const Details = () => {
  let { id } = useParams();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetail, setMovieDetail] = useState("");

  const imageOriginalUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const moviesApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=6095a4dbaeaa73eae234fb23c9d6ff0b`;

    const getMovieDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(moviesApiUrl);
        if (!response.ok) {
          throw new Error("Something went wrong, can't fetch words");
        }
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        setError(error.message);
        setOpenSnackBar(true);
      }
      setIsLoading(false);
    };
    getMovieDetail();
  }, [id]);

  return (
    <>
      <StyledCard>
        <StyledCardMedia
          component="img"
          image={imageOriginalUrl + movieDetail.backdrop_path}
          alt={movieDetail.title}
        />
      </StyledCard>
      <StyledCardContent>
        <InnerCardMedia
          component="img"
          image={imageOriginalUrl + movieDetail.poster_path}
          alt={movieDetail.title}
        />
        <StyledBox>
          <StyledTypography>{movieDetail.title}</StyledTypography>
          <Stack direction="row" sx={{ mb: 1 }}>
            <StarIcon sx={{ color: "yellow", mr: 1 }} />{" "}
            <span>{movieDetail.vote_average} / 10</span>
          </Stack>
          <Stack direction="row" sx={{ mb: 2 }}>
            <TrendingUpIcon sx={{ color: "green", mr: 1 }} />
            <span>{movieDetail.popularity}</span>
          </Stack>
          <Stack direction="row" flexWrap="wrap">
            {movieDetail &&
              movieDetail.genres.map((genre) => (
                <StyledChip
                  key={genre.name}
                  label={genre.name}
                  variant="outlined"
                />
              ))}
          </Stack>
          <Typography>{movieDetail.overview}</Typography>
        </StyledBox>
      </StyledCardContent>
    </>
  );
};

export default Details;
