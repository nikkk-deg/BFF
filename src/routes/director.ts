import express from "express";
const {
  getDirectors,
  addOneDirector,
  findDirector,
} = require("../controllers/director");

const routes = express.Router();

routes.get("/directors", getDirectors);
routes.post("/directors", addOneDirector);
routes.get("/directorFindByMovie", findDirector);

module.exports = routes;
