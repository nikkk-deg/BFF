import { body, param } from "express-validator";

export const baseDirectorChain = () => body("name").notEmpty().escape();
export const updateDirectorChain = () => [body("name").notEmpty().escape(), param("id").isMongoId().escape()]
};
