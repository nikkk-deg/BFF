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
    .then((json) =>
      res.status(201).json({
        email: json.email,
        // token: json.token,
      })
    )
    .catch((err) => handlerError(res, err));
};

const handlerAuthUser = async (req: Request, res: Response) => {
  const jwt = require("jsonwebtoken");
  User.find({ email: req.body.email })
    .then((json) => {
      const decoded = jwt.verify(json[0].token, process.env.JWT_SECRET);
      if (decoded.password === req.body.password) {
        return res
          .status(200)
          .json(
            `Вход выполнен успешно ${json[0].email}. Ваш token: Bearer ${json[0].token}`
          );
      }
      return res.status(404).json("Wrong email or password...");
    })
    .catch((err) => res.send("User not found"));
};

const handlerAddFav = async (req: Request, res: Response) => {
  if (req.body.movies && req.body.token) {
    return User.find({ token: req.body.token })
      .then((json) => {
        if (json) {
          return res.status(204);
        }
        return res.status(404).json({ message: "User not found" });
      })
      .catch((err) => res.status(404).json({ message: "User not found" }));
  }
  return res.status(400).json({ message: "Wrong body of request" });
};

module.exports = {
  handlerAddFav,
  handlerCreateUser,
  handlerAuthUser,
};
