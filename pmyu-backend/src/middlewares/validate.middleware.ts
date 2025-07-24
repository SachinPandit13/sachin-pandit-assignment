import { Request, Response, NextFunction } from "express";
import {validationResult} from "express-validator";
import { responseHandler } from "../handlers";
import { STATUS_CODES } from "../enums";

export const validatorHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return responseHandler(
      response,
      STATUS_CODES.BAD_REQUEST,
      "Validation error",
      {},
      errors.array()
    );
    next();
};
