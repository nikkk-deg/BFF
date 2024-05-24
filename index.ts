import express from "express";

const app = express();

const port = 3009;

const db ={
  brandTitles : [
    { id: 1, title: "Toyota" },
    { id: 2, title: "Lada" },
    { id: 3, title: "Lexus" },
  ];
} 

app.get("/", (req, res) => {
  res.send("hello worl1!");
});

app.get("/catalog", (req, res) => {
  res.json(db.brandTitles);
});

app.get("/catalog/:id", (req, res) => {
  const brand = db.brandTitles.find((item) => item.id === +req.params.id);

  if (brand === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(brand);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
