import { MongoDriverError } from "mongodb";
import { Director } from "../models/director";
import { Movie } from "../models/movie";
import { handlerError } from "./error";
import { query, validationResult, matchedData, param } from "express-validator";

const getDirectors = (req: any, res: any) => {
  return Director.find()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addOneDirector = (req: any, res: any) => {
  const data = matchedData(req);
  if (data.name !== "" && data.name !== undefined && data.name !== null) {
    const director = new Director(data.name);
    return director
      .save()
      .then((item: any) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: `Field 'name' is empty` });
};

const deleteDirector = (req: any, res: any) => {
  if (param("id").isMongoId()) {
    return Director.findByIdAndDelete(req.params.id)
      .then((item: any) => res.status(200).json(item))
      .catch((err) => handlerError(res, err));
  }
  res.send({ errors: `Field 'id' is incorrect` });
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
