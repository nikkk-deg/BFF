import mongoose, { Schema } from "mongoose";
import { title } from "process";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  directorId: {
    ref: "Directors",
    type: Schema.Types.ObjectId,
  },
  year: {
    type: Number,
    required: true,
  },
  genres: [
    {
      ref: "Genres",
      type: Schema.Types.ObjectId,
    },
  ],
  rating: Number,
  duration: {
    hours: Number,
    minutes: Number,
  },
  comment: [
    {
      ref: "Comments",
      type: Schema.Types.ObjectId,
    },
  ],
  description: String,
});

export const Movie = mongoose.model("Movies", movieSchema);
