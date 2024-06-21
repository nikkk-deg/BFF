import express from "express";
import {
  baseCommentChain,
  deleteCommentChain,
  updateCommentChain,
} from "../controllers/validation";
const {
  handlerFindComments,
  handlerAddOneComment,
  handlerDeleteComment,
  handlerUpdateComment,
} = require("../controllers/comments");

const routes = express.Router();

routes.get("/comments", handlerFindComments);
routes.post("/comments", baseCommentChain(), handlerAddOneComment);
routes.delete("/comments/:id", deleteCommentChain(), handlerDeleteComment);
routes.put("/comments/:id", updateCommentChain(), handlerUpdateComment);

module.exports = routes;
