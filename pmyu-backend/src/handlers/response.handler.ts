import { Request, Response } from "express";
import { IResponse } from "../interfaces";
import { STATUS_CODES } from "../enums";

/**
 * @description
 * Standard response formatter used across all APIs.
 * Helps maintain consistent API response structure.
 *
 * @param {Response} response -  Response object
 * @param {STATUS_CODES} code - HTTP status code (custom enum)
 * @param {string} message - Message describing the result
 * @param {unknown} data - Payload/data to send to the client
 * @param {unknown} [error] - Optional error information (used in error cases)
 *
 * @returns Sends a formatted response to the client
 */

export const responseHandler = (
  response: Response,
  code: STATUS_CODES,
  message: string,
  data: unknown,
  error?: unknown
) => {
  const _response: IResponse = {
    code,
    data,
    message,
    error,
  };
  response.status(code).send(_response);
};
