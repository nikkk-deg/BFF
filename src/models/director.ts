import mongoose, { Schema } from "mongoose";

const directorSchema = new Schema({
  name: String,
});

export const Director = mongoose.model("Directors", directorSchema);
