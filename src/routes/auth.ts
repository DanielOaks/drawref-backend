import express, { Request, Response } from "express";
import querystring from "querystring";
import urlJoin from "url-join";
import { V3 } from "paseto";

import { githubActive, githubClientId, myURL, frontendURL, pasetoLocalKey } from "../config/env.js";
import { getProfileData } from "../auth/github.js";
import { TokenMap } from "../auth/tokens.js";

export const router = express.Router();

const loginURL = urlJoin(frontendURL, "/login");
const loginSuccessfulURL = urlJoin(frontendURL, "/login/success");

const loginExpirationSeconds = 60 * 60 * 24;

// GitHub
//
const githubStateTokens = new TokenMap();
const githubRedirectURL = urlJoin(myURL, "/api/auth/github/callback");

router.get("/github", (req: Request, res: Response) => {
  if (!githubActive) {
    res.redirect(loginURL);
    return false;
  }

  res.redirect(
    `https://github.com/login/oauth/authorize?${querystring.stringify({ client_id: githubClientId, redirect_uri: githubRedirectURL, scope: "read:user", state: githubStateTokens.create() })}`,
  );
});

router.get("/github/callback", async (req: Request, res: Response) => {
  var githubCode = req.query.code;
  var stateIsValid = req.query.state && githubStateTokens.isValid(String(req.query.state));

  if (!githubCode || !stateIsValid) {
    //TODO: redirect to login page with query param for failed login message
    res.status(401);
    res.json({
      message: "login failed",
    });
    return false;
  }

  // confirm code with GitHub
  const profileData = await getProfileData(String(githubCode));

  if (!profileData) {
    //TODO: redirect to login page with query param for failed login message
    res.status(401);
    res.json({
      message: "login failed",
    });
    return false;
  }

  // assemble token and return it
  const expirationTime = new Date().getTime() + loginExpirationSeconds * 1000;
  const tokenData = Buffer.from(
    JSON.stringify({
      iss: "gh",
      exp: expirationTime,
      id: profileData.id,
      name: profileData.name,
    }),
    "utf-8",
  );
  const token = await V3.encrypt(tokenData, pasetoLocalKey);

  res.redirect(
    `${loginSuccessfulURL}?${querystring.stringify({
      token,
    })}`,
  );
});
