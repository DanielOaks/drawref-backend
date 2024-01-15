import express from "express";

export const router = express.Router();

router.get("/start/github", (req, res) => {
  res.send("Starting GitHub login");
});
