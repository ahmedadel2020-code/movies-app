import { render, fireEvent, screen } from "../utils/unitTests";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "./MovieCard";
import Details from "../pages/Details";

// mock request to our endpoint words

const movies = rest.get("movie/popular", (req, res, ctx) => {
  return res(
    ctx.json({
      results: [
        {
          title: "Thor: Love and Thunder",
        },
      ],
    })
  );
});

const server = new setupServer({ movies });

// listen to requests before all test and after all tests will close server

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MovieCard Component", () => {
  test("check if there is image of movie", async () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movies} />
      </BrowserRouter>
    );
    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();
  });

  test("check if there is Details Button", async () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movies} />
      </BrowserRouter>
    );
    const card = await screen.findByRole("card");
    fireEvent.mouseOver(card);
    const button = await screen.findByText("Details");
    expect(button).toBeInTheDocument();
  });

  test("check if Navigation to Detail page is done when click on Detail button", async () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movies} />
      </BrowserRouter>
    );
    const card = await screen.findByRole("card");
    fireEvent.mouseOver(card);
    const button = await screen.findByText("Details");
    fireEvent.click(button);

    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const movieTitle = await screen.findByText(movies.results.title);
      expect(movieTitle).toBeInTheDocument();
    };
  });
});
