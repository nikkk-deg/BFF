import mongoose, { Schema } from "mongoose";

const directorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Director = mongoose.model("Directors", directorSchema);
