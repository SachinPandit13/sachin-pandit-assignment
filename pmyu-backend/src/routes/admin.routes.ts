import express from "express";
import { admin } from "../controllers";
import { validatorHandler } from "../middlewares";
import { approveApplicationValidator, rejectApplicationValidator } from "../validator";
export const adminRoute = (): express.Router => {
  const router = express.Router();
  router.get("/applications", admin.getAllApplications);
  router.put("/approve/:aadharNumber", approveApplicationValidator, validatorHandler, admin.approveApplication);
  router.put("/reject/:aadharNumber",rejectApplicationValidator, validatorHandler, admin.rejectApplication);
  return router;
};
