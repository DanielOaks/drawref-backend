import express, { Request, Response, NextFunction } from "express";

export function needLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401);
    res.send({
      error: "Authentication required",
    });
    return;
  }

  next();
}

export function needAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || !req.user.admin) {
    res.status(401);
    res.send({
      error: "Authentication required",
    });
    return;
  }

  next();
}
