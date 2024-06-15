import express from "express";
const {
  getDirectors,
  addOneDirector,
  deleteDirector,
  updateDirector,
} = require("../controllers/director");

const routes = express.Router();

routes.get("/directors", getDirectors);
routes.post("/directors", addOneDirector);
routes.delete("/directors/:id", deleteDirector);
routes.put("/directors/:id", updateDirector);

module.exports = routes;
