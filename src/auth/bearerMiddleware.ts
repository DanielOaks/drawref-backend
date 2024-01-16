import express, { Request, Response, NextFunction } from "express";
import { V3 } from "paseto";

import { githubActive, githubAdminUids, pasetoLocalKey } from "../config/env.js";

type ClaimObject = {
  from: string;
  uid: number;
  name: string;
  exp: string;
};

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  // check for header
  if (!req.headers.authorization) {
    next();
    return;
  }

  // decrypt
  var data: ClaimObject;
  try {
    data = await V3.decrypt(req.headers.authorization.split(" ")[1] || "", pasetoLocalKey);
  } catch (error) {
    console.error("Could not decrypt paseto key:", error);
    next();
    return;
  }

  // valid! check the admin-ness of the user and return
  var isAdmin = false;
  if (githubActive && data.from === "gh") {
    isAdmin = isAdmin || githubAdminUids.includes(data.uid);
  }

  req.user = {
    admin: isAdmin,
    name: data.name,
    exp: data.exp,
  };

  next();
}
