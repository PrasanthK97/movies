const express = require("express");
const app = express();

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "moviesData.db");

let db;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.get("/movies/", async (request, response) => {
  const movieListQuery = `SELECT *
                       FROM movie`;
  let movies = await db.all(movieListQuery);
  response.send(movies);
});

app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const movieListQuery = `SELECT *
                           FROM movie
                        WHERE movie_id = ${movieId}`;
  let movies = await db.get(movieListQuery);
  response.send(movies);
});
