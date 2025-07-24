import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { responseHandler } from "./response.handler";
import { STATUS_CODES } from "../enums";

/**
 * @description
 * Error handler middleware
 * Catches errors and formats them into a standard response structure.
 *
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error("Error occurred:", error);

  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((err) => ({
      message: err.message,
      field: err.path,
    }));

    return responseHandler(
        response,
        STATUS_CODES.BAD_REQUEST,
        "Validation error",
        {},
        errors[0] || "Invalid input data"
    )
  }

   if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return responseHandler(
      response,
      STATUS_CODES.ALREADY_EXISTS,
      "Duplicate entry found.",
      {},
      `${field} already exists.`
    );
  }

  if (error instanceof mongoose.Error.CastError) {
    return responseHandler(
      response,
      STATUS_CODES.BAD_REQUEST,
      "Invalid identifier.",
      {},
      `Invalid ${error.path}: ${error.value}`
    );
  }

  return responseHandler(
    response,
    STATUS_CODES.INTERNAL_SERVER_ERROR,
    "Something went wrong on the server.",
    {},
    error.message || "Unexpected server error."
  );
};
