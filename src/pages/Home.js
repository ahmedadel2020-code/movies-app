import { Alert, Container, Snackbar, styled } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Grid from "@mui/material/Grid";
import Loading from "../components/Loading";

const StyledContainer = styled(Container)({
  marginTop: "40px",
  marginBottom: "40px",
});

const Home = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const moviesApiUrl =
      "https://api.themoviedb.org/3/movie/popular?api_key=6095a4dbaeaa73eae234fb23c9d6ff0b";

    const getMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(moviesApiUrl);
        if (!response.ok) {
          throw new Error("Something went wrong, can't fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
        setOpenSnackBar(true);
      }
      setIsLoading(false);
    };
    getMovies();
  }, []);

  const handleCloseSnackBar = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  }, []);

  return (
    <StyledContainer>
      <Loading loading={isLoading} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={10000}
        onClose={handleCloseSnackBar}
      >
        {error && (
          <Alert severity="error" onClose={handleCloseSnackBar}>
            {error}
          </Alert>
        )}
      </Snackbar>
      <Grid container spacing={{ xs: 4, md: 3 }} role="grid">
        {movies.map((movie) => (
          <Grid item xs={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default Home;
