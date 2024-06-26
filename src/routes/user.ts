import express from "express";
import { createAndAuthUser } from "../controllers/validation";

const { handlerCreateUser, handlerAuthUser } = require("../controllers/user");

const routes = express.Router();

routes.post("/user", createAndAuthUser(), handlerCreateUser);
routes.post("/user/auth", createAndAuthUser(), handlerAuthUser);

module.exports = routes;
