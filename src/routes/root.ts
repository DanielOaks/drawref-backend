import express, { Request, Response } from "express";

import { needAdmin } from "../auth/authRequiredMiddleware.js";
import { useDatabase } from "../db/database.js";

export const router = express.Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({
    ping: "ok",
  });
});

router.put("/category-order", needAdmin, async (req: Request, res: Response) => {
  const categories: string[] = req.body.categories;

  if (!categories || categories.length === 0) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  const db = useDatabase();
  const error = await db.reorderCategories(categories);

  if (error) {
    res.json({
      error: `Categories could not be reordered: ${error}`,
    });
    return;
  }

  res.json({
    ok: true,
  });
});
