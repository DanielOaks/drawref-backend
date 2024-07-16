import express, { Request, Response } from "express";
import multer from "multer";
import mime from "mime-types";
import { uuidv7 } from "uuidv7";

import { uploadPathTmp } from "../config/env.js";
import { needAdmin } from "../auth/authRequiredMiddleware.js";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPathTmp);
    },
    filename: function (req, file, cb) {
      const ext = mime.extension(file.mimetype) || "bin";
      cb(null, `${uuidv7()}.${ext}`);
    },
  }),
});

export const router = express.Router();

router.post("/image", needAdmin, upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    res.json({
      error: "File not uploaded",
    });
    return;
  }

  res.json({
    // this temporary path will be passed to the add image endpoint
    path: req.file?.filename,
  });
});
