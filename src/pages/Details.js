import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100vh",
  opacity: "0.2",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    height: "115vh",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: "100%",
  backgroundRepeat: "repeat",
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "column",
  },
}));

const InnerCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "250px",
  height: "400px",
  borderRadius: "25px",
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginLeft: "40px",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
    padding: "0 30px",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "33px",
  color: "white",
  marginBottom: "10px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledTypographyResponsive = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  color: "white",
  marginBottom: "20px",
  margin: "20px auto",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const StyledGenresStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: "20px",
  },
}));

const StyledChip = styled(Chip)({
  color: "white",
  marginRight: "8px",
  marginBottom: "10px",
  cursor: "pointer",
  letterSpacing: "1px",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
});

const StyledOverview = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: "20px",
  },
}));

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
        <StyledTypographyResponsive>
          {movieDetail.title}
        </StyledTypographyResponsive>
        <InnerCardMedia
          component="img"
          image={imageOriginalUrl + movieDetail.poster_path}
          alt={movieDetail.title}
        />
        <StyledBox>
          <StyledTypography>{movieDetail.title}</StyledTypography>
          <Stack
            direction={{ xs: "row", md: "column" }}
            justifyContent={{ xs: "center" }}
          >
            <Stack direction="row" sx={{ mb: 1, mr: 4 }}>
              <StarIcon sx={{ color: "yellow", mr: 1 }} />{" "}
              <span>{movieDetail.vote_average} / 10</span>
            </Stack>
            <Stack direction="row" sx={{ mb: 2 }}>
              <TrendingUpIcon sx={{ color: "green", mr: 1 }} />
              <span>{movieDetail.popularity}</span>
            </Stack>
          </Stack>
          <StyledGenresStack
            direction="row"
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            {movieDetail &&
              movieDetail.genres.map((genre) => (
                <StyledChip
                  key={genre.name}
                  label={genre.name}
                  variant="outlined"
                />
              ))}
          </StyledGenresStack>
          <StyledOverview>{movieDetail.overview}</StyledOverview>
        </StyledBox>
      </StyledCardContent>
    </>
  );
};

export default Details;
