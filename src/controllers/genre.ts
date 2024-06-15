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

const deleteGenre = (req: any, res: any) => {
  Genre.findByIdAndDelete(req.params.id)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const updateGenre = (req: any, res: any) => {
  Genre.findByIdAndUpdate(req.params.id, req.body)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getGenres,
  addOneGenre,
  deleteGenre,
  updateGenre,
};
