import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { Director } from "../models/director";
import {
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithParams,
} from "../types/types";
import { DirectorCreateModel } from "../types/DirectorCreateModel";
import { DirectorUpdateModel } from "../types/DirectorUpdateModel";
import { handlerError } from "./error";

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
    const director = new Director(data);
    return director
      .save()
      .then((item) =>
        res.status(200).json({
          name: item.name,
        })
      )
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerDeleteDirector = (
  req: RequestWithParams<{ id: string }>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    Director.findByIdAndDelete(data.id)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerUpdateDirector = (
  req: RequestWithParamsAndBody<{ id: string }, DirectorUpdateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Director.findByIdAndUpdate(data.id, data)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }

  res.send({ errors: result.array() });
};

module.exports = {
  handlerFindDirectors,
  handlerAddDirector,
  handlerDeleteDirector,
  handlerUpdateDirector,
};
