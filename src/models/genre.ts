import mongoose, { Schema } from "mongoose";

const genreSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Genre = mongoose.model("Genres", genreSchema);
