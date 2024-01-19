import express, { Request, Response } from "express";
import urlJoin from "url-join";

import { hostBaseURL } from "../config/env.js";
import { categories, Category } from "../sampleData.js";

// fixup sample image URLs
categories.forEach((cat) => {
  cat.cover = cat.cover ? urlJoin(hostBaseURL, cat.cover) : undefined;
});

export const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log("creating new category", req.body);
  if (!req.body.id || !req.body.name) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  if (categories.filter((cat) => cat.id === req.body.id).length > 0) {
    res.status(400);
    res.json({
      error: "Category already exists.",
    });
    return;
  }

  categories.push(req.body);
  res.json({
    id: req.body.id,
  });
});

router.get("/", (req: Request, res: Response) => {
  res.send(categories);
});

router.get("/:id", (req: Request, res: Response) => {
  var id = req.params.id || "";
  var selectedCat: Category = categories.filter((cat) => cat.id === id)[0];

  res.send(selectedCat || { error: true, message: "Category not found" });
});
