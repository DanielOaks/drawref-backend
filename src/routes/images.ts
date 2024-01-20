import express, { Request, Response } from "express";
import { renameSync } from "fs";
import { join } from "path";

import { uploadPathTmp, uploadPathFinal } from "../config/env.js";
import { needAdmin } from "../auth/authRequiredMiddleware.js";
import { useDatabase } from "../db/database.js";

export const router = express.Router();

router.post("/", needAdmin, async (req: Request, res: Response) => {
  const iPath = req.body.path || "";
  const iExternalUrl = req.body.external_url || "";
  const iAuthor = req.body.author;

  if ((!req.body.path && !req.body.external_url) || req.body.author === undefined) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  // move image to the live directory
  try {
    renameSync(join(uploadPathTmp, iPath), join(uploadPathFinal, iPath));
  } catch (error) {
    console.error("Failed to rename:", error);
    res.status(400);
    res.json({
      error: "Couldn't add image.",
    });
    return;
  }

  const db = useDatabase();
  const new_id = await db.addImage(iPath, iExternalUrl, iAuthor);

  if (!new_id) {
    res.status(400);
    res.json({
      error: "Couldn't add image.",
    });
    return;
  }

  res.json({
    id: new_id,
  });
});
