import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { Movie } from "./models/movie";

const url = "mongodb://localhost:27017/moviebox";
const port = process.env.PORT || 3000;

mongoose
  .connect(url)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Not connected to DB"));

const app = express();

const requestMiddleware = express.json();
app.use(requestMiddleware);

const handlerError = (res: any) => {
  res.status(500).json("Something wrong...");
};

app.get("/movies", (req, res) => {
  Movie.find()
    .sort({ year: -1 })
    .then((item) => res.status(200).json(item))
    .catch(() => handlerError(res));
});

app.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .then((item) => res.status(200).json(item))
    .catch(() => handlerError(res));
});

app.delete("/movies/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((item) => res.status(200).json(item))
    .catch(() => handlerError(res));
});

app.post("/movies", (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((item) => res.status(200).json(item))
    .catch(() => handlerError(res));
});

app.patch("/movies/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.status(200).json(item))
    .catch(() => handlerError(res));
});

app.listen(port, () => console.log(`App listining on ${port}`));
