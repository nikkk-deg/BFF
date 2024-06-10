import { Genre } from "../models/genre";
import { handlerError } from "./error";

const getGenres = (req: any, res: any) => {
  Genre.find()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addOneGenre = (req: any, res: any) => {
  const genre = new Genre(req.body);
  genre
    .save()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getGenres,
  addOneGenre,
};
