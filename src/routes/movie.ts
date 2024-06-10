import express from "express";
const {
  getMovies,
  getOneMovie,
  deleteOneMovie,
  addOneMovie,
  updateOneMovie,
  addNewComment,
} = require("../controllers/movie");

const routes = express.Router();

routes.get("/movies", getMovies);
routes.get("/movies/:id", getOneMovie);
routes.delete("/movies/:id", deleteOneMovie);
routes.post("/movies", addOneMovie);
routes.patch("/movies/:id", updateOneMovie);
routes.post("/comments/:id", addNewComment);

module.exports = routes;