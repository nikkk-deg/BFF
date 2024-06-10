import express from "express";
const { getGenres, addOneGenre } = require("../controllers/genre");

const routes = express.Router();

routes.get("/genres", getGenres);
routes.post("/genres", addOneGenre);

module.exports = routes;
