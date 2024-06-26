import { body, param } from "express-validator";

export const baseDirectorChain = () => body("name").notEmpty().escape();
export const updateDirectorChain = () => [
  body("name").notEmpty().escape(),
  param("id").isMongoId().escape(),
];
export const deleteDirectorChain = () => param("id").isMongoId().escape();

export const baseGenreChain = () => body("title").notEmpty().escape();
export const updateGenreChain = () => [
  body("title").notEmpty().escape(),
  param("id").isMongoId().escape(),
];
export const deleteGenreChain = () => param("id").isMongoId().escape();

export const baseCommentChain = () => [
  body("name").notEmpty().escape(),
  body("text").notEmpty().escape(),
];
export const updateCommentChain = () => [
  body("name").notEmpty().escape(),
  body("text").notEmpty().escape(),
  param("id").isMongoId().escape(),
];
export const deleteCommentChain = () => param("id").isMongoId().escape();

export const findMovieChain = () => param("id").isMongoId().escape();
export const deleteMovieChain = () => param("id").isMongoId().escape();
export const createMovieChain = () => [
  body("title").notEmpty().escape(),
  body("directorId").notEmpty().isMongoId().escape(),
  body("year").notEmpty().escape(),
  body("genres").notEmpty().escape(),
  body("rating").notEmpty().escape(),
  body("duration").notEmpty().isObject().escape(),
];
export const updateMovieChain = () => [
  param("id").isMongoId().escape(),
  body("title").notEmpty().escape(),
];

export const createAndAuthUser = () => [
  body("email").notEmpty().trim().isEmail().escape(),
  body("password").notEmpty().isLength({ min: 4 }),
];
