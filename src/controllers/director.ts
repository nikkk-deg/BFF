import { MongoDriverError } from "mongodb";
import { Director } from "../models/director";
import { Movie } from "../models/movie";
import { handlerError } from "./error";

const getDirectors = (req: any, res: any) => {
  Director.find()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addOneDirector = (req: any, res: any) => {
  const director = new Director(req.body);
  director
    .save()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const findDirector = async (req: any, res: any) => {
  //   const director = await Director.findOne({ name: "Frank Darabon" });
  //   const newMovie = await Movie.create({
  //     title: "Green Mile",
  //     director: director,
  //     year: 2001,
  //   });
  //   res.json(newMovie);

  const newDirector = await Movie.findOne({ title: "Green Mile" }).populate(
    "director"
  );
  res.json(newDirector);
  //   const newOne = await Movie.findOne({ title: "Snatch" }).populate(
  //     "Directors",
  //     "name"
  //   );
  //   res.json(newOne?.director);
};

module.exports = {
  getDirectors,
  addOneDirector,
  findDirector,
};
