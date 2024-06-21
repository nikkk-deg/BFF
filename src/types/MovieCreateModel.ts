import { Schema } from "mongoose";

export type MovieCreateModel = {
  title: string;
  directorId: Schema.Types.ObjectId;
  year: Number;
  genres: Schema.Types.ObjectId[];
  rating: number;
  duration: {
    hours: Number;
    minutes: Number;
  };
  comment: Schema.Types.ObjectId[];
};
