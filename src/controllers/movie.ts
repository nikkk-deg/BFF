import { Movie } from "../models/movie";

const handlerError = (res: any, err: any) => {
  res.status(500).json(err);
};

const getMovies = (req: any, res: any) => {
  Movie.find()
    .sort({ year: -1 })
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const getOneMovie = (req: any, res: any) => {
  Movie.findById(req.params.id)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const deleteOneMovie = (req: any, res: any) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addOneMovie = (req: any, res: any) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const updateOneMovie = (req: any, res: any) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addNewComment = (req: any, res: any) => {
  Movie.findById(req.params.id)
    .then((item: any) => {
      let newComments = item.reviews;
      newComments.push(req.body.newReview);
      Movie.findByIdAndUpdate(req.params.id, { reviews: newComments }).then(
        (item: any) => res.status(200).json(item)
      );
    })
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getMovies,
  getOneMovie,
  deleteOneMovie,
  addOneMovie,
  updateOneMovie,
  addNewComment,
};
