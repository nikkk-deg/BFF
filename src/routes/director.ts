import express from "express";
import {
  baseDirectorChain,
  updateDirectorChain,
} from "../controllers/validation";
import { body, matchedData, validationResult } from "express-validator";
import { Director } from "../models/director";
import { handlerError } from "../controllers/error";
const {
  handlerFindDirectors,
  handlerAddDirector,
  handlerDeleteDirector,
  handlerUpdateDirector,
} = require("../controllers/director");

const routes = express.Router();
const array: any[] = [];

routes.get("/directors", handlerFindDirectors);

routes.post("/directors", baseDirectorChain(), handlerAddDirector);

routes.delete("/directors/:id", handlerDeleteDirector);
routes.put("/directors/:id", updateDirectorChain(), handlerUpdateDirector);

module.exports = routes;
