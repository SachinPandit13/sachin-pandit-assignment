import { body, param } from "express-validator";

export const rejectApplicationValidator = [
  param("aadharNumber")
    .notEmpty()
    .withMessage("Aadhar number is required in the URL.")
    .bail()
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar number must be 12 digits.")
    .bail()
    .matches(/^\d{12}$/)
    .withMessage("Aadhar number must be numeric and 12 digits long."),

  body("reason")
    .notEmpty()
    .withMessage("Rejection reason is required.")
    .bail()
    .isString()
    .withMessage("Reason must be a valid string.")
    .isLength({ min: 3 })
    .withMessage("Reason must be at least 3 characters.")
];

export const approveApplicationValidator = [
  param("aadharNumber")
    .notEmpty()
    .withMessage("Aadhar number is required in the URL.")
    .bail()
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar number must be 12 digits.")
    .bail()
    .matches(/^\d{12}$/)
    .withMessage("Aadhar number must be numeric and 12 digits long.")
];
