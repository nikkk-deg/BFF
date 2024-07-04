import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
