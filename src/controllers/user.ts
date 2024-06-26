import { validationResult, matchedData } from "express-validator";
import { User } from "../models/user";
import { Request, Response } from "express";
import { handlerError } from "./error";

const handlerCreateUser = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const user = new User(data);
    return user
      .save()
      .then((json) => res.status(201).json(json))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

const handlerAuthUser = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    User.find({ email: data.email })
      .then((json) => res.json(json))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: result.array() });
};

module.exports = {
  handlerCreateUser,
  handlerAuthUser,
};
