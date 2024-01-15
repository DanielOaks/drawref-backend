import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3300;
const hostBaseURL = process.env.HOST_BASEURL || "http://localhost:3300/images/";

export { port, hostBaseURL };
