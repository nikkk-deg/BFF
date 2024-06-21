import express from "express";
import {
  createMovieChain,
  deleteMovieChain,
  findMovieChain,
  updateMovieChain,
} from "../controllers/validation";
const {
  handlerFindMovies,
  handlerFindMovie,
  handlerDeleteMovie,
  handlerAddOneMovie,
  handlerUpdateMovie,
} = require("../controllers/movie");

const routes = express.Router();

routes.get("/movies", handlerFindMovies);
routes.get("/movies/:id", findMovieChain(), handlerFindMovie);
routes.delete("/movies/:id", deleteMovieChain(), handlerDeleteMovie);
routes.post("/movies", createMovieChain(), handlerAddOneMovie);
routes.put("/movies/:id", updateMovieChain(), handlerUpdateMovie);

module.exports = routes;
