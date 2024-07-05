import { app } from "../src";
const MockStrategy = require("passport-mock-strategy");
const passport = require("passport");
import request from "supertest";
import { User } from "../src/models/user";

const startedUser = {
  token: "token444",
  movies: "",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2l0YUBiY29tcC5ydSIsInBhc3N3b3JkIjoiOTc4Nzk4Nzg1MTMyMSIsImlhdCI6MTcxOTQ4MTE3OX0.0pryvKwVMJqAYdrsqdvozbqGO4RGwwvLokYsw7mi_WQ";

passport.use(new MockStrategy());

jest.spyOn(console, "log").mockImplementation(() => {});
// jest.spyOn(User, "find").mockImplementation(() => {
//     if(startedUser.token === 'token123'){
//         return
//     }
// });

describe("/user", () => {
  it("should return 400 and Wrong body of request", async () => {
    await request(app)
      .post("/user/addFav")
      .send({ t: "token123", movies: ["snatch", "matrix"] }) //must be token
      .expect(400, { message: "Wrong body of request" });
  });
  it("should return 404 and User not found", async () => {
    await request(app)
      .post("/user/addFav")
      .send({ token: "token123", movies: ["snatch", "matrix"] }) //token123 - несузествующий token
      .expect(404, { message: "User not found" });
  });
  it("should return 200 and favoritws films of user", async () => {
    await request(app)
      .post("/user/addFav")
      .send({ token: token, movies: ["snatch", "matrix"] })
      .expect(200, { favorites: ["snatch", "matrix"] });
  });
});
