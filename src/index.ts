import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User } from "./models/user";

dotenv.config();

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const movieRoutes = require("./routes/movie");
const genreRoutes = require("./routes/genre");
const commentRoutes = require("./routes/comment");
const directorsRoutes = require("./routes/director");
const userRoutes = require("./routes/user");

const url = process.env.URL_TO_DB || "";
const port = process.env.PORT;

export const app = express();
app.use(express.json());
app.use(movieRoutes);
app.use(genreRoutes);
app.use(commentRoutes);
app.use(directorsRoutes);
app.use(userRoutes);

passport.use(
  new BearerStrategy(async (token: string, done: any) => {
    try {
      const user = await User.findOne({ token: token });
      if (user) {
        return done(null, user);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: "all" });
    } catch (err) {
      console.log(err);
    }
  })
);

mongoose
  .connect(url)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Not connected to DB"));

app.listen(port, () => console.log(`App listining on ${port}`));
