import express from "express";
import { createUser, authUser } from "../controllers/validation";

const { handlerCreateUser, handlerAuthUser } = require("../controllers/user");

const routes = express.Router();

routes.post("/user", createUser(), handlerCreateUser);
routes.post("/user/auth", authUser(), handlerAuthUser);
routes.post("/user/auth", authUser(), handlerAuthUser);

module.exports = routes;
