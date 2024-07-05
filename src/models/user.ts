import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: Schema.ObjectId,
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  roles: {
    type: [String],
  },
  token: {
    type: String,
    required: true,
  },
  favorites: [String],
});

export const User = mongoose.model("User", userSchema);
