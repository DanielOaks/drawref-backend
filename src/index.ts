import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import urlJoin from 'url-join';

import { categories, Category, images } from './sampleData.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3300;
const hostBaseURL = process.env.HOST_BASEURL || "http://localhost:3300/images/";

app.get("/", (req: Request, res: Response) => {
  res.send({
    ping: "ok",
  });
});

app.get("/api/categories", (req: Request, res: Response) => {
  res.send(categories);
});
app.get("/api/categories/:id", (req: Request, res: Response) => {
  var selectedCat: Category = categories[parseInt(req.params.id || '0')]
  res.send(selectedCat || {error: true, message: 'Category not found'});
});

app.get("/api/session", (req: Request, res: Response) => {
  res.send(images);
});

app.use('/images', express.static('public'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Example url: ${urlJoin(hostBaseURL, "/cover/etc.jpg")}`)
});
