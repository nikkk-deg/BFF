import { body } from "express-validator";

export const baseDirectorChain = () => body("name").notEmpty().escape();
