import express from "express";
import {
  baseGenreChain,
  deleteGenreChain,
  updateGenreChain,
} from "../controllers/validation";
const {
  handlerAddGenre,
  handlerFindGenres,
  handlerUpdateGenre,
  handlerDeleteGenre,
} = require("../controllers/genre");

const routes = express.Router();

routes.get("/genres", handlerFindGenres);
routes.post("/genres", baseGenreChain(), handlerAddGenre);
routes.delete("/genres/:id", deleteGenreChain(), handlerDeleteGenre);
routes.put("/genres/:id", updateGenreChain(), handlerUpdateGenre);

module.exports = routes;
