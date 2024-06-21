import { Request, Response } from "express";
import { Movie } from "../models/movie";
import { handlerError } from "./error";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/types";
import { MovieCreateModel } from "../types/MovieCreateModel";
import { MovieUpdateModel } from "../types/MovieUpdateModel";
import { matchedData, validationResult } from "express-validator";

const handlerFindMovies = (req: Request, res: Response) => {
  Movie.find()
    .then((item) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const handlerFindMovie = async (
  req: RequestWithParams<{ id: string }>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const director = await Movie.findById(data.id).populate("directorId");
    const genres = await Movie.findById(data.id).populate("genres");
    return Movie.findById(data.id)
      .then((item) => {
        const newItem = {
          title: item?.title,
          director: director?.directorId,
          year: item?.year,
          genres: genres?.genres,
          rating: item?.rating,
        };
        res.status(200).json(newItem);
      })
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerDeleteMovie = (
  req: RequestWithParams<{ id: string }>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Movie.findByIdAndDelete(data.id)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerAddOneMovie = (
  req: RequestWithBody<MovieCreateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const movie = new Movie(data);
    return movie
      .save()
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerUpdateMovie = (
  req: RequestWithParamsAndBody<{ id: string }, MovieUpdateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Movie.findByIdAndUpdate(data.id, data)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

module.exports = {
  handlerFindMovies,
  handlerFindMovie,
  handlerDeleteMovie,
  handlerAddOneMovie,
  handlerUpdateMovie,
};
