import express, { Request, Response } from "express";

import { needLoggedIn } from "../auth/authRequiredMiddleware.js";

export const router = express.Router();

router.get("/", needLoggedIn, (req: Request, res: Response) => {
  res.send(req.user);
});
