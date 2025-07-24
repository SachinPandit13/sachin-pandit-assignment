import { Request, Response, NextFunction } from "express";
import { adminServices } from "../services";
import { responseHandler } from "../handlers";
import { STATUS_CODES } from "../enums";

class AdminController {
  /**
   * Get all LPG applications submitted by users.
   *
   * This function is used by the admin to fetch the list of all applications.
   * It sends a success response with the data if found,
   * otherwise returns a "No applications found" message.
   *
   * @param {Request} request - The incoming HTTP request object.
   * @param {Response} response - The HTTP response object to send the result.
   * @param {NextFunction} next - Express middleware function to handle errors.
   */
  getAllApplications = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await adminServices.getAll();
      if (!data) {
        return responseHandler(
          response,
          STATUS_CODES.NOT_FOUND,
          "No applications found!",
          {}
        );
      }

      return responseHandler(
        response,
        STATUS_CODES.SUCCESS,
        "Applications fetched successfully!",
        data
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * Approve a user's LPG application based on Aadhar number.
   *
   * This function is used by the admin to approve a pending application.
   * It first checks if the given Aadhar number is valid. If valid,
   * it approves the application and sends a success response.
   * If the Aadhar is not found or invalid, it returns an error response.
   *
   * @param {Request} request - The incoming HTTP request (expects Aadhar number in URL params).
   * @param {Response} response - The HTTP response object to send the result.
   * @param {NextFunction} next - Express middleware function to handle any errors.
   */
  approveApplication = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { aadharNumber } = request.params;
      const valid = await adminServices.validateAadhar(aadharNumber);
      if (!valid) {
        return responseHandler(
          response,
          STATUS_CODES.BAD_REQUEST,
          "Invalid Aadhar Number",
          {}
        );
      }
      const data = await adminServices.approve(aadharNumber);
      return responseHandler(
        response,
        STATUS_CODES.SUCCESS,
        "Application Approved!",
        data
      );
    } catch (error) {
      next(error);
    }
  };
  /**
   * Reject a user's LPG application based on Aadhar number.
   *
   * This function is used by the admin to reject an application.
   * It expects a reason for rejection in the request body. If no reason is given,
   * it returns an error. Otherwise, it marks the application as rejected.
   *
   * @param {Request} request - The incoming HTTP request (expects Aadhar number in params and reason in body).
   * @param {Response} response - The HTTP response object to send the result.
   * @param {NextFunction} next - Express middleware function to handle any errors.
   */
  rejectApplication = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { aadharNumber } = request.params;
      const { reason } = request.body;

      if (!reason) {
        return responseHandler(
          response,
          STATUS_CODES.BAD_REQUEST,
          "Rejection reason is required!",
          {}
        );
      }
      const data = await adminServices.reject(aadharNumber, reason);
      return responseHandler(
        response,
        STATUS_CODES.SUCCESS,
        "Applcation rejected!",
        data
      );
    } catch (error) {
      next(error);
    }
  };
}

export const admin = new AdminController();
