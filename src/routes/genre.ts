import express from "express";
const {
  getGenres,
  addOneGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/genre");

const routes = express.Router();

routes.get("/genres", getGenres);
routes.post("/genres", addOneGenre);
routes.delete("/genres/:id", deleteGenre);
routes.put("/genres/:id", updateGenre);

module.exports = routes;
