import { render, screen } from "../utils/unitTests";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import Details from "./Details";

// mock request to our endpoint words

const movie = rest.get("movie/507086", (req, res, ctx) => {
  return res(
    ctx.json({
      overview:
        "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
      popularity: 4799.187,

      title: "Jurassic World Dominion",
      video: false,
      vote_average: 7.112,
    })
  );
});

const server = new setupServer({ movie });

// listen to requests before all test and after all tests will close server

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Details Page Component", () => {
  test("check if there is title of movie", () => {
    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const movieTitle = await screen.findByText(movie.title);
      expect(movieTitle).toBeInTheDocument();
    };
  });

  test("check if there is a vote", () => {
    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const vote = await screen.findByText(movie.vote_average);
      expect(vote).toBeInTheDocument();
    };
  });

  test("check if there is a popularity", () => {
    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const popularity = await screen.findByText(movie.popularity);
      expect(popularity).toBeInTheDocument();
    };
  });

  test("check if there is an image", () => {
    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const image = await screen.findByRole("img");
      expect(image).toBeInTheDocument();
    };
  });

  test("check if there is an overview of the movie", () => {
    window.onload = async () => {
      render(
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      );
      const overview = await screen.findByText(movie.overview);
      expect(overview).toBeInTheDocument();
    };
  });
});
