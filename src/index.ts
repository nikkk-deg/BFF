import express from "express";
import mongoose from "mongoose";

const movieRoutes = require("./routes/movie");

const url = "mongodb://localhost:27017/moviebox";
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(url)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Not connected to DB"));

app.listen(port, () => console.log(`App listining on ${port}`));
