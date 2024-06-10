import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comments", commentSchema);
