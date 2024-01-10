import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { categories, Category, images } from './sampleData';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3300;

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
});
