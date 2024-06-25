import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { body, matchedData, query, validationResult } from "express-validator";
import { baseDirectorChain } from "./controllers/validation";
import { Movie } from "./models/movie";
import { formatDocToAddInDB } from "./controllers/formatData";
dotenv.config();

const movieRoutes = require("./routes/movie");
const genreRoutes = require("./routes/genre");
const commentRoutes = require("./routes/comment");
const directorsRoutes = require("./routes/director");

const url = process.env.URL_TO_DB || "";
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(movieRoutes);
app.use(genreRoutes);
app.use(commentRoutes);
app.use(directorsRoutes);

mongoose
  .connect(url)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Not connected to DB"));

app.listen(port, () => console.log(`App listining on ${port}`));
