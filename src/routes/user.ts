import express, { Request, Response } from "express";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    res.send({
      message: "Authentication required",
    });
    return;
  }

  res.send(req.user);
});
