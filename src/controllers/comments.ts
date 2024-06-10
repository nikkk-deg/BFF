import { Comment } from "../models/comment";
import { handlerError } from "./error";

const getComments = (req: any, res: any) => {
  Comment.find()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const addOneComment = (req: any, res: any) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getComments,
  addOneComment,
};
