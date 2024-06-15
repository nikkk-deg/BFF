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

const deleteDirector = (req: any, res: any) => {
  Director.findByIdAndDelete(req.params.id)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const updateDirector = (req: any, res: any) => {
  Director.findByIdAndUpdate(req.params.id, req.body)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

// const findDirector = async (req: any, res: any) => {
//   const newDirector = await Movie.findOne({ title: "Green Mile" }).populate(
//     "director"
//   );
//   res.json(newDirector);
// };

module.exports = {
  getDirectors,
  addOneDirector,
  deleteDirector,
  updateDirector,
  // findDirector,
};
