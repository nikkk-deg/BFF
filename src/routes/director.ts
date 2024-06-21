import express from "express";
import {
  baseDirectorChain,
  deleteDirectorChain,
  updateDirectorChain,
} from "../controllers/validation";

const {
  handlerFindDirectors,
  handlerAddDirector,
  handlerDeleteDirector,
  handlerUpdateDirector,
} = require("../controllers/director");

const routes = express.Router();

routes.get("/directors", handlerFindDirectors);
routes.post("/directors", baseDirectorChain(), handlerAddDirector);
routes.delete("/directors/:id", deleteDirectorChain(), handlerDeleteDirector);
routes.put("/directors/:id", updateDirectorChain(), handlerUpdateDirector);

module.exports = routes;
