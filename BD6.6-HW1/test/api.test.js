const request = require("supertest");
const { app } = require("../index");
const {
  getAllMovies,
  getMoviesById,
} = require("../controllers/index.controller");
const http = require("http");
// const { describe } = require("node:test");
// const { describe, beforeEach, afterEach } = require("node:test");

jest.mock("../controllers/index.controller", () => ({
  ...jest.requireActual("../controllers/index.controller"),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

// api endpoints

describe("Movie API Tests", () => {
  //Exercise 3: Test Retrieve All Movies
  it("should return all movies", async () => {
    let mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);
    const response = await request(app).get("/movies");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMovies);
  });

  // Exercise 4: Test Retrieve Movie by ID

  it("should return a movie by ID", async () => {
    let mockMovie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };

    const response = await request(app).get("/movies/details/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMovie);
  });
});

//
describe("controllers test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 5: Mock the Get All Movies Function

  it("should return all correct function value", () => {
    let mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);

    let result = getAllMovies();

    expect(result).toEqual(mockMovies);
    expect(result.length).toEqual(3);
  });
});
