import express from "express";

const app = express();

const port = 3009;

app.get("/", (req, res) => {
  res.send("hello worl1445555544!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
