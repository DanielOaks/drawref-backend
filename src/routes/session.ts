import express, { Request, Response } from "express";

import { useDatabase } from "../db/database.js";

export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const category = String(req.query.category) || "";

  if (!category) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  const db = useDatabase();
  const images = await db.getSessionImages(category);

  res.send(images);
});
