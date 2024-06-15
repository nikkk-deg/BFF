import express from "express";
const {
  getComments,
  addOneComment,
  deleteComment,
  updateComment,
} = require("../controllers/comments");

const routes = express.Router();

routes.get("/comments", getComments);
routes.post("/comments", addOneComment);
routes.delete("/comments/:id", deleteComment);
routes.put("/comments/:id", updateComment);

module.exports = routes;
