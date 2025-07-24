import express from "express";
import { userRoute } from "./user.routes";
import { adminRoute } from "./admin.routes";
export function routes(): express.Router {
  const router = express.Router();

  router.use("/user", userRoute());
  router.use("/admin", adminRoute());
  return router;
}
