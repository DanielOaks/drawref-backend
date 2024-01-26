import express, { Request, Response } from "express";
import urlJoin from "url-join";

import { hostBaseURL } from "../config/env.js";
import { images } from "../sampleData.js";

// fixup sample image URLs
images.forEach((img) => {
  img.path = urlJoin(hostBaseURL, "..", img.path);
});

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(images);
});
