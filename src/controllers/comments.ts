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

const deleteComment = (req: any, res: any) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

const updateComment = (req: any, res: any) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then((item: any) => res.status(200).json(item))
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getComments,
  addOneComment,
  deleteComment,
  updateComment,
};
