import { Genre } from "../models/genre";
import { GenresCreateModel } from "../types/GenresCreateModel";
import { GenresUpdateModel } from "../types/GenresUpdateModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/types";
import { handlerError } from "./error";
import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

const handlerFindGenres = (req: Request, res: Response) => {
  Genre.find()
    .then((item) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const handlerAddGenre = (
  req: RequestWithBody<GenresCreateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const genre = new Genre(data);
    return genre
      .save()
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }

  res.send({ errors: result.array() });
};

const handlerDeleteGenre = (
  req: RequestWithParams<{ id: string }>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Genre.findByIdAndDelete(data.id)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerUpdateGenre = (
  req: RequestWithParamsAndBody<{ id: string }, GenresUpdateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Genre.findByIdAndUpdate(data.id, data)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

module.exports = {
  handlerAddGenre,
  handlerFindGenres,
  handlerUpdateGenre,
  handlerDeleteGenre,
};
