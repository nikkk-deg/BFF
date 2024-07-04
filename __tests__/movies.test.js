"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../src");
const MockStrategy = require("passport-mock-strategy");
const passport = require("passport");
passport.use(new MockStrategy());
jest
    .spyOn(console, "log") // метод sendMagicLink у mailService будет заменен на
    .mockImplementation(() => "test");
const startedUser = {
    email: "nikita.deki4@gmail.com",
    password: "0000",
    token: "token123",
    favorites: [],
};
const finishedUser = {
    email: "nikita.deki4@gmail.com",
    password: "0000",
    token: "token123",
    favorites: ["snatch", "matrix"],
};
const errorUserToken = {
    message: "User not found",
};
const errorUser = {
    message: "Wrong body of request",
};
// describe("/directors", () => {
//   it("POST: should return 200 and new director", async () => {
//     await request(app)
//       .post("/directors")
//       .send({ name: "Tom Holland" })
//       .expect(200, {
//         name: "Tom Holland",
//       });
//   });
// });
describe("/user", () => {
    // it("POST: should return 200 and new user", async () => {
    //   await request(app)
    //     .post("/user")
    //     .send({ email: "dnm@bcomp.ru", password: "0000" })
    //     .expect({ email: "dnm@bcomp.ru" });
    // });
    // it("POST: should return 404 and string with email and bearer token", async () => {
    //   await request(app)
    //     .post("/user/auth")
    //     .send({ email: "dnm@bcomp.ru", password: "0000" })
    //     .expect(`"Вход выполнен успешно dnm@bcomp.ru."`);
    // });
    // it("POST: should return 404 and string with email and bearer token", async () => {
    //   await request(app)
    //     .post("/user/auth")
    //     .send({ email: "dnm@bcomp.ru", password: "000" })
    //     .expect(404, `"Wrong email or password..."`);
    // });
    // it("POST: should return 404 and User not found", async () => {
    //   await request(app)
    //     .post("/user/auth")
    //     .send({ email: "dnm@bcop.ru", password: "0000" })
    //     .expect("User not found");
    // });
    // it('Should return 200 and add Movie "Snatch" to favorites', async () => {
    //   await request(app)
    //     .post("/user/addFav")
    //     .send({ movies: ["snatch", "matrix"], token: "token123" })
    //     .expect(finishedUser);
    // });
    it("Should return 404 and User not found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post("/user/addFav")
            .send({ movies: ["snatch", "matrix"], token: "token12" })
            .expect(404, errorUserToken);
    }));
    it("Should return 400 and Wrong body of request", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post("/user/addFav")
            .send({ films: ["snatch", "matrix"], token: "token123" })
            .expect(400, errorUser);
    }));
});
