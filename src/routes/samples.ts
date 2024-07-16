import express, { Request, Response } from "express";

import { needAdmin } from "../auth/authRequiredMiddleware.js";
import { sampleCategories, sampleImages } from "../sampleData.js";

export const router = express.Router();

router.get("/", needAdmin, async (req: Request, res: Response) => {
  res.json({
    categories: sampleCategories,
    images: sampleImages.map((info) => {
      return {
        author: info.author,
        author_url: info.author_url,
        requirement: info.requirement,
        image_count: info.images.length,
      };
    }),
  });
});
