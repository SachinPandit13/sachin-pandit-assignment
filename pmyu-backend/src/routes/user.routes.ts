import express from "express";
import { user } from "../controllers";
import { validatorHandler } from "../middlewares";
import { aadharParamValidator, userFormValidator } from "../validator";

export const userRoute = (): express.Router => {
    const router  = express.Router();
    router.post('/submit', userFormValidator, validatorHandler, user.submitForm);
    router.get('/get-status/:aadharNumber', aadharParamValidator, validatorHandler, user.getStatusByAadhar);
    return router;
} 