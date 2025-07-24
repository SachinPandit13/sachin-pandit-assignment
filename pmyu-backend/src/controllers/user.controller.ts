import { Request, Response, NextFunction } from "express";
import { userServices } from "../services";
import { responseHandler } from "../handlers";
import { STATUS_CODES } from "../enums";

class UserController {

  /**
   * Submit the LPG application form.
   *
   * This method takes user input (from request body) and sends it to the service
   * to store the data. Returns a success message with the stored data.
   *
   * @param {Request} request - HTTP request object containing user form data in body.
   * @param {Response} response - HTTP response object to send result back.
   * @param {NextFunction} next - Middleware function to handle errors.
   */
  submitForm = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await userServices.applyForm(request.body);
      return responseHandler(
        response,
        STATUS_CODES.SUCCESS,
        "Form submited successfully!",
        data
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get application status using Aadhar number.
   *
   * This method is used to check the current status of a user's application.
   * It searches based on Aadhar number passed in the URL params.
   * Returns the status if found, or a "not found" message.
   *
   * @param {Request} request - HTTP request object (expects Aadhar number in params).
   * @param {Response} response - HTTP response object to send result back.
   * @param {NextFunction} next - Middleware function to handle errors.
   *
   * @returns {Promise<void>}
   */
  getStatusByAadhar = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
        const data = await userServices.getStatusByAadhar(request.params.aadharNumber);
        return responseHandler(
            response,
            data? STATUS_CODES.SUCCESS: STATUS_CODES.NOT_FOUND,
            data? "Status fetched successfully!" : "No Data associated with entered Aadhar number!",
            data || {}
        );
        
    } catch (error) {
      next(error);
    }
  };
}

export const user = new UserController();
