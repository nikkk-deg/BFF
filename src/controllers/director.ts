import { MongoDriverError } from "mongodb";
import { Director } from "../models/director";
import { Movie } from "../models/movie";
import { handlerError } from "./error";
import { Request, Response } from "express";
import { query, validationResult, matchedData, param } from "express-validator";
import mongoose from "mongoose";
import { RequestWithBody, RequestWithParamsAndBody } from "../types/types";
import { DirectorCreateModel } from "../types/DirectorCreateModel";
import { DirectorUpdateModel } from "../types/DirectorUpdateModel";

const handlerFindDirectors = (req: Request, res: Response) => {
  return Director.find()
    .then((item) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const handlerAddDirector = (
  req: RequestWithBody<DirectorCreateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.name !== "" && data.name !== undefined && data.name !== null) {
      const director = new Director(data);
      return director
        .save()
        .then((item) => res.status(200).json(item))
        .catch((err) => handlerError(res, err));
    }
    res.send({ errors: `Field 'name' is empty` });
  }
  res.send({ errors: result.array() });
};

const handlerDeleteDirector = (req: Request, res: Response) => {
  if (param("id").isMongoId()) {
    return Director.findByIdAndDelete(req.params.id)
      .then((item: any) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: `Field 'id' is incorrect` });
};

const handlerUpdateDirector = (
  req: RequestWithParamsAndBody<{ id: string }, DirectorUpdateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.name !== "" && data.name !== undefined && data.name !== null) {
      return Director.findByIdAndUpdate(data.id, { name: data.name })
        .then((item: any) => res.status(200).json(item))
        .catch((err) => handlerError(res, err));
    }
    res.send({ errors: `Field 'name' is empty` });
  }

  res.send({ errors: result.array() });
};

module.exports = {
  handlerFindDirectors,
  handlerAddDirector,
  handlerDeleteDirector,
  handlerUpdateDirector,
};
