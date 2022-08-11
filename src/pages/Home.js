import { Container, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Grid from "@mui/material/Grid";

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
          throw new Error("Something went wrong, can't fetch words");
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

  return (
    <StyledContainer>
      <Grid container spacing={{ xs: 4, md: 3 }}>
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
