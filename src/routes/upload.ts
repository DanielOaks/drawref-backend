import express, { Request, Response } from "express";

import { useDatabase } from "../db/database.js";
import { needAdmin } from "../auth/authRequiredMiddleware.js";

export const router = express.Router();

router.post("/image", needAdmin, async (req: Request, res: Response) => {
  console.log("uploading image:", req);

  res.json({
    id: "test",
    // id: new_id,
  });
});
