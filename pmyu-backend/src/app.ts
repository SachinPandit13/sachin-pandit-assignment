import express, { Express } from "express";
import { corsOptions } from "./cors";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./handlers/error.handler";

const app: Express = express();
//Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Enable CORS with custom options
app.use(cors(corsOptions));

// Mount all API routes under /api
app.use("/api", routes());

// Global error handling middleware
app.use(errorHandler)

export default app;
