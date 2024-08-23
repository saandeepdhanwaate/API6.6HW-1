const express = require("express");
const app = express();
const cors = require("cors");

const {
  getAllMovies,
  getMoviesById,
} = require("./controllers/index.controller");

app.use(express.json());
app.use(cors());

// Exercise 1: Retrieve All Movies 🟢

app.get("/movies", async (_, res) => {
  try {
    let movies = await getAllMovies();
    if (!movies) {
      return res.status(404).json({ message: "movies not found" });
    }
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Retrieve Movie by ID  🟢
app.get("/movies/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let movie = await getMoviesById(id);

    if (!movie) {
      return res.status(404).json({ message: "movies not found" });
    }
    return res.status(200).json({ movie });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = { app };
