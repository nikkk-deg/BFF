import mongoose, { Schema } from "mongoose";

const Shema = mongoose.Schema;

const movieShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genres: [String],
  rating: Number,
  duration: {
    hours: Number,
    minutes: Number,
  },
  reviews: [
    {
      name: String,
      text: String,
    },
  ],
});

export const Movie = mongoose.model("Movie", movieShema);
