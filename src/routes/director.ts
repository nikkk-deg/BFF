import express from "express";
import { baseDirectorChain } from "../controllers/validation";
import { body, matchedData, validationResult } from "express-validator";
import { Director } from "../models/director";
import { handlerError } from "../controllers/error";
const {
  getDirectors,
  addOneDirector,
  deleteDirector,
  updateDirector,
} = require("../controllers/director");

const routes = express.Router();

routes.get("/directors", getDirectors);

routes.post("/directors", baseDirectorChain(), (req: any, res: any) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.name !== "" && data.name !== undefined && data.name !== null) {
      const director = new Director(data);
      return director
        .save()
        .then((item: any) => res.status(200).json(item))
        .catch((err) => handlerError(res, err));
    }
    res.send({ errors: `Field 'name' is empty` });
  }
  res.send({ errors: result.array() });
});

routes.delete("/directors/:id", deleteDirector);
routes.put("/directors/:id", updateDirector);

module.exports = routes;
