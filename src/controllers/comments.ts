import { Request, Response } from "express";
import { Comment } from "../models/comment";
import { CommentCreateModel } from "../types/CommentCreateModel";
import { CommentUpdateModel } from "../types/CommentUpdateModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/types";
import { handlerError } from "./error";
import { matchedData, validationResult } from "express-validator";

const handlerFindComments = (req: Request, res: Response) => {
  Comment.find()
    .then((item) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const handlerAddOneComment = (
  req: RequestWithBody<CommentCreateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const comment = new Comment(data);
    return comment
      .save()
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerDeleteComment = (
  req: RequestWithParams<{ id: string }>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Comment.findByIdAndDelete(data.id)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerUpdateComment = (
  req: RequestWithParamsAndBody<{ id: string }, CommentUpdateModel>,
  res: Response
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return Comment.findByIdAndUpdate(data.id, data)
      .then((item) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

module.exports = {
  handlerFindComments,
  handlerAddOneComment,
  handlerDeleteComment,
  handlerUpdateComment,
};
