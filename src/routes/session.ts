import express, { Request, Response } from "express";

import { useDatabase } from "../db/database.js";
import { TagMap } from "../types/drawref.js";

export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const category = String(req.query.category) || "";
  var tags: TagMap;
  try {
    tags = JSON.parse(String(req.query.tags) || "{}");
  } catch (error) {
    console.error("Failed to parse tags:", error);
    res.status(400);
    res.json({
      error: "Couldn't parse tags.",
    });
    return;
  }

  if (!category) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  const db = useDatabase();
  const images = await db.getSessionImages(category, tags);

  res.json(images);
});

router.get("/count", async (req: Request, res: Response) => {
  const category = String(req.query.category) || "";
  var tags: TagMap;
  try {
    tags = JSON.parse(String(req.query.tags) || "{}");
  } catch (error) {
    console.error("Failed to parse tags:", error);
    res.status(400);
    res.json({
      error: "Couldn't parse tags.",
    });
    return;
  }

  if (!category) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  const db = useDatabase();
  const count = await db.getSessionImageCount(category, tags);

  res.json({
    images: count,
  });
});
