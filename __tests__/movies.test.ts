import request from "supertest";
import { app } from "../src";

describe("/directors", () => {
  it("POST: should return 200 and new director", async () => {
    await request(app)
      .post("/directors")
      .send({ name: "Tom Holland" })
      .expect(200, {
        name: "Tom Holland",
      });
  });
});

describe("/user", () => {
  it("POST: should return 200 and new user", async () => {
    await request(app)
      .post("/user")
      .send({ email: "dnm@bcomp.ru", password: "0000" })
      .expect({ email: "dnm@bcomp.ru" });
  });

  it("POST: should return 404 and string with email and bearer token", async () => {
    await request(app)
      .post("/user/auth")
      .send({ email: "dnm@bcomp.ru", password: "0000" })
      .expect(`"Вход выполнен успешно dnm@bcomp.ru."`);
  });
  it("POST: should return 404 and string with email and bearer token", async () => {
    await request(app)
      .post("/user/auth")
      .send({ email: "dnm@bcomp.ru", password: "000" })
      .expect(404, `"Wrong email or password..."`);
  });
  it("POST: should return 404 and User not found", async () => {
    await request(app)
      .post("/user/auth")
      .send({ email: "dnm@bcop.ru", password: "0000" })
      .expect("User not found");
  });
});
