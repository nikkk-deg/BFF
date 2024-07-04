import express from "express";

import { createUser, authUser } from "../controllers/validation";
const {
  handlerCreateUser,
  handlerAuthUser,
  handlerAddFav,
} = require("../controllers/user");
const passport = require("passport");

const routes = express.Router();

routes.post("/user", createUser(), handlerCreateUser);
routes.post("/user/auth", authUser(), handlerAuthUser);
routes.get(
  "/getAll",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    res.json({ message: "You have got all world!" });
  }
);
routes.post("/user/addFav", handlerAddFav);

module.exports = routes;
