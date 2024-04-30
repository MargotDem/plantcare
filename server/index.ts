import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";

import { usersRouter, plantsRouter } from "./routes";

const app = express();

const PORT = process.env.PORT || 3002;

const isProduction = process.env.NODE_ENV === "production";

const origin = {
  origin: isProduction
    ? "https://www.production_url.com"
    : process.env.LOCAL_FRONTEND,
};

// TODO: ?
app.use(json());

// secure HTTP headers in an Express app
app.use(helmet());

// enable CORS to be able to make requests from the frontend
app.use(cors(origin));

// load routers
app.use(usersRouter);
app.use(plantsRouter);

// health check endpoint
app.get("/health", (req, res) => {
  res.json({ message: "Hello World! This is a message from the backend" });
});

app.listen(PORT, () => {
  console.log(`Todos app listening on port ${PORT}`);
});
