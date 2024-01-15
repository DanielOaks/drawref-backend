import express, { Express, Request, Response } from "express";
import cors from "cors";

import { port, hostBaseURL } from "./config/env.js";
import { router as authRouter } from "./routes/auth.js";
import { router as categoriesRouter } from "./routes/categories.js";
import { router as sessionRouter } from "./routes/session.js";
import { router as testRouter } from "./routes/test.js";

const app: Express = express();

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/session", sessionRouter);
app.use("/api", testRouter);

// mostly for testing
app.use("/images", express.static("public"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Serving images from: ${hostBaseURL}`);
});
