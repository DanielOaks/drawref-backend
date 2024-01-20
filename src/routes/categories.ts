import express, { Request, Response } from "express";

import { needAdmin } from "../auth/authRequiredMiddleware.js";
import { useDatabase } from "../db/database.js";
import { Category, TagEntry } from "../types/drawref.js";

export const router = express.Router();

router.post("/", needAdmin, async (req: Request, res: Response) => {
  if (!req.body.id || !req.body.name) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  const { id: cId, name: cName, image: cImage } = req.body;
  const cTags: Array<TagEntry> = req.body.tags;

  if (cId === "" || cName === "") {
    res.status(400);
    res.json({
      error: "ID and name must be provided.",
    });
    return;
  }

  const db = useDatabase();
  const new_id = await db.addCategory(cId, cName, cImage, cTags);

  if (!new_id) {
    res.status(400);
    res.json({
      error: "Couldn't create category. Maybe it already exists.",
    });
    return;
  }

  res.json({
    id: new_id,
  });
});

router.get("/", async (req: Request, res: Response) => {
  const db = useDatabase();
  const categories = await db.getCategories();

  res.json(categories);
});

router.get("/:id", async (req: Request, res: Response) => {
  var id = req.params.id || "";
  const db = useDatabase();
  const categories = await db.getCategories();
  var selectedCat: Category = categories.filter((cat) => cat.id === id)[0];

  res.json(selectedCat || { error: true, message: "Category not found" });
});
