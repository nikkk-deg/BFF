import mongoose, { Schema } from "mongoose";

const directorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  films: [
    {
      ref: "Movies",
      type: Schema.Types.ObjectId,
    },
  ],
});

export const Director = mongoose.model("Directors", directorSchema);
