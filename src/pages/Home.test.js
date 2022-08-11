import { render, fireEvent, screen } from "../utils/unitTests";
import Home from "./Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard";

// mock request to our endpoint words
const ApiUrl = "movie/popular";

const movies = rest.get("movie/popular", (req, res, ctx) => {
  return res(
    ctx.json({
      results: [
        {
          adult: false,
          backdrop_path: "/p1F51Lvj3sMopG948F5HsBbl43C.jpg",
          genre_ids: [28, 12, 14],
          id: 616037,
          original_language: "en",
          original_title: "Thor: Love and Thunder",
          overview:
            "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now inexplicably wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
          popularity: 8625.547,
          poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
          release_date: "2022-07-06",
          title: "Thor: Love and Thunder",
          video: false,
          vote_average: 6.8,
          vote_count: 1774,
        },
        {
          adult: false,
          backdrop_path: "/7bhvI1tM7JBmqP8HSevIsebSBbh.jpg",
          genre_ids: [12, 28, 878],
          id: 507086,
          original_language: "en",
          original_title: "Jurassic World Dominion",
          overview:
            "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
          popularity: 4799.187,
          poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
          release_date: "2022-06-01",
          title: "Jurassic World Dominion",
          video: false,
          vote_average: 7.1,
          vote_count: 2643,
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

describe("Home Page Component", () => {
  test("check if there is a Grid with Movies", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const grid = await screen.findByRole("grid");
    expect(grid).toBeInTheDocument();
  });
});
