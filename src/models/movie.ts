import mongoose, { Schema } from "mongoose";

const movieShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
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
});

export const Movie = mongoose.model("Movies", movieShema);
