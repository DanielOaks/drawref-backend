import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import urlJoin from 'url-join';

import { categories, Category, images, SessionImage } from './sampleData.js';

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
  var newCategories: Category[] = [];
  categories.forEach(cat => {
    cat.cover = cat.cover ? urlJoin(hostBaseURL, cat.cover) : undefined;
    newCategories.push(cat)
  })

  res.send(newCategories);
});
app.get("/api/categories/:id", (req: Request, res: Response) => {
  var id = parseInt(req.params.id || '0')
  var selectedCat: Category = categories.filter(cat => cat.id === id)[0]
  if (selectedCat && selectedCat.cover) {
    selectedCat.cover = urlJoin(hostBaseURL, selectedCat.cover)
  }

  res.send(selectedCat || {error: true, message: 'Category not found'});
});

app.get("/api/session", (req: Request, res: Response) => {
  var newImages: SessionImage[] = [];
  images.forEach(img => {
    newImages.push({
      path: urlJoin(hostBaseURL, img.path),
      author: img.author,
    })
  })

  res.send(newImages);
});

app.use('/images', express.static('public'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Serving images from: ${hostBaseURL}`)
});
