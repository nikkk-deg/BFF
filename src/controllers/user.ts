import { validationResult, matchedData } from "express-validator";
import { User } from "../models/user";
import e, { Request, Response } from "express";
import { handlerError } from "./error";
import { jwtDecode } from "jwt-decode";

const handlerCreateUser = async (req: Request, res: Response) => {
  var jwt = require("jsonwebtoken");
  const email = req.body.email;
  const password = req.body.password;
  const token = await jwt.sign({ email, password }, process.env.JWT_SECRET);
  const user = new User({
    email: req.body.email,
    token: token,
  });
  user
    .save()
    .then((json) => res.status(201).json(json))
    .catch((err) => handlerError(res, err));
};

const handlerAuthUser = async (req: Request, res: Response) => {
  var jwt = require("jsonwebtoken");
  const user = User.find({ email: req.body.email });
  user.then((json) => res.send(json?.email));
  // res.send(user);
  // const email = req.body.email;
  // const password = req.body.password;
  // const token = await jwt.sign({ email, password }, process.env.JWT_SECRET);
  // res.send(token);
  // User.find({ token: token })
  //   .then((json) => res.status(201).json(json))
  //   .catch((err) => handlerError(res, err));
};

module.exports = {
  handlerCreateUser,
  handlerAuthUser,
};
