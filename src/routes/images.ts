import express, { Request, Response } from "express";
import { copyFileSync } from "fs";
import { join } from "path";

import { needAdmin } from "../auth/authRequiredMiddleware.js";
import { useDatabase } from "../db/database.js";
import urlJoin from "url-join";
import { uploadPathTmp, uploadUrlPrefix } from "../config/env.js";
import { uploadFile } from "../files/s3.js";

export const router = express.Router();

router.post("/", needAdmin, async (req: Request, res: Response) => {
  const iPath = req.body.path || "";
  const iExternalUrl = req.body.external_url || "";
  const iAuthor = req.body.author || "";
  const iAuthorUrl = req.body.author_url || "";

  if ((!req.body.path && !req.body.external_url) || req.body.author === undefined) {
    res.status(400);
    res.json({
      error: "Required parameters not supplied.",
    });
    return;
  }

  // move image to the live directory
  const uploaded = uploadFile(join(uploadPathTmp, iPath), iPath);
  if (!uploaded) {
    res.status(400);
    res.json({
      error: "Could not upload file.",
    });
    return;
  }

  const db = useDatabase();
  const new_id = await db.addImage(iPath, iExternalUrl, iAuthor, iAuthorUrl);

  if (!new_id) {
    res.status(400);
    res.json({
      error: "Couldn't add image.",
    });
    return;
  }

  res.json({
    id: new_id,
    url: iExternalUrl ? iExternalUrl : urlJoin(uploadUrlPrefix, iPath),
  });
});

router.get("/sources", async (req: Request, res: Response) => {
  const db = useDatabase();

  const sources = await db.getImageSources();

  res.send(sources);
});
