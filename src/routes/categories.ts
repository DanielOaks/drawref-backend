import express, { Request, Response } from "express";
import urlJoin from "url-join";

import { hostBaseURL } from "../config/env.js";
import { categories, Category } from "../sampleData.js";

// fixup sample image URLs
categories.forEach((cat) => {
  cat.cover = cat.cover ? urlJoin(hostBaseURL, cat.cover) : undefined;
});

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(categories);
});
router.get("/:id", (req: Request, res: Response) => {
  var id = req.params.id || "";
  var selectedCat: Category = categories.filter((cat) => cat.id === id)[0];

  res.send(selectedCat || { error: true, message: "Category not found" });
});
