import express from "express";
const { getComments, addOneComment } = require("../controllers/comments");

const routes = express.Router();

routes.get("/comments", getComments);
routes.post("/comments", addOneComment);

module.exports = routes;
