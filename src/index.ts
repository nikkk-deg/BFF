import express from "express";
import mongoose from "mongoose";

const movieRoutes = require("./routes/movie");
const genreRoutes = require("./routes/genre");
const commentRoutes = require("./routes/comment");
const directorsRoutes = require("./routes/director");

const url = "mongodb://localhost:27017/moviebox";
const port = process.env.PORT || 3000;

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
