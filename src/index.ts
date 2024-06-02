import express from "express";
const mongoose = require("mongoose");
const cors = require("cors");

const { Schema } = mongoose;

const app = express();

const allowedOrigins = [
  "", // один или несколько хостов
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

const port = process.env.PORT || 3000;

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUNDED_404: 404,
};

const url = "mongodb://localhost:27017/main"; // указываем имя нужной базы
mongoose.connect(url);

const CategorySchemaDrama = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
});

const Category = mongoose.model("Category", CategorySchemaDrama);

const MovieSchema = new Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Movie = mongoose.model("Movie", MovieSchema); // создаем модель по схеме

const requestMiddleware = express.json();
app.use(requestMiddleware);

const db = {
  brandTitles: [
    { id: 1, title: "Toyota" },
    { id: 2, title: "Lada" },
    { id: 3, title: "Lexus" },
  ],
};

app.post("/movies", async (req, res) => {
  const category = await Category.create({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.category,
  });
  const movie = await Movie.create({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
    category: category._id,
  });
  return res.status(201).json("movie created"); // возвращаем ответ
});

app.delete("/movies/:title", async (req, res) => {
  res.json(`Mivoe ${req.params.title} has been deleted.`);
});

app.put("/movies/:title", async (req, res) => {
  res.json(`Mivoe ${req.params.title} has been changed.`);
});

app.get("/", (req, res) => {
  res.send("hello worl1!");
});

app.get("/catalog", (req, res) => {
  if (req.query.title) {
    const foundedCars = db.brandTitles.filter(
      (item) => item.title.indexOf(req.query.title as string) > -1
    );
    res.json(foundedCars);
    return;
  }
  res.json(db.brandTitles);
});

app.get("/catalog/:id", (req, res) => {
  const brand = db.brandTitles.find((item) => item.id === +req.params.id);

  if (brand === undefined) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
    return;
  }

  res.json(brand);
});

app.post("/catalog", (req, res) => {
  if (req.body.title === "" || req.body.title.trim().length === 0) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
    return;
  }
  const newItem = {
    id: db.brandTitles.length + 1,
    title: req.body.title,
  };

  db.brandTitles.push(newItem);
  res.status(HTTP_STATUSES.CREATED_201).json(db.brandTitles);
});

app.delete("/catalog/:id", (req, res) => {
  const isElemInArray = db.brandTitles.filter(
    (item) => item.id === +req.params.id
  ).length;

  if (isElemInArray) {
    db.brandTitles = db.brandTitles.filter(
      (item) => item.id !== +req.params.id
    );
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
});

app.put("/catalog/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
    return;
  }

  const foundedElement = db.brandTitles.find(
    (item) => item.id === +req.params.id
  );

  if (!foundedElement) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  foundedElement.title = req.body.title;
  res.json(foundedElement);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
