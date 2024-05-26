"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3009;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUNDED_404: 404,
};
const requestMiddleware = express_1.default.json();
app.use(requestMiddleware);
const db = {
    brandTitles: [
        { id: 1, title: "Toyota" },
        { id: 2, title: "Lada" },
        { id: 3, title: "Lexus" },
    ],
};
app.get("/", (req, res) => {
    res.send("hello worl1!");
});
app.get("/catalog", (req, res) => {
    if (req.query.title) {
        const foundedCars = db.brandTitles.filter((item) => item.title.indexOf(req.query.title) > -1);
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
    const isElemInArray = db.brandTitles.filter((item) => item.id === +req.params.id).length;
    if (isElemInArray) {
        db.brandTitles = db.brandTitles.filter((item) => item.id !== +req.params.id);
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
    const foundedElement = db.brandTitles.find((item) => item.id === +req.params.id);
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
