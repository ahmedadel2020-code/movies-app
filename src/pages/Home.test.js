import { render, screen } from "../utils/unitTests";
import Home from "./Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

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
