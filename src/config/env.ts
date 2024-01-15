import dotenv from "dotenv";
import { V3 } from "paseto";

dotenv.config();

export const port = process.env.PORT || 3300;
export const myURL = process.env.MY_BASEURL || "";
export const hostBaseURL = process.env.HOST_BASEURL || "";
export const frontendURL = process.env.FRONTEND_BASEURL || "";

export const githubClientId = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const githubActive = githubClientId && githubClientSecret;

if (!process.env.PASETO_LOCAL_KEY) {
  console.log("PASETO local key must be defined in the PASETO_LOCAL_KEY environment variable.");
  console.log("Here's a new randomly-generated one you can use:");
  console.log(
    await V3.generateKey("local", {
      format: "paserk",
    }),
  );
  console.log("Closing server");
  process.exit();
}
export const pasetoLocalKey = process.env.PASETO_LOCAL_KEY;
