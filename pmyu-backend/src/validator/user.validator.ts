import { body, param} from "express-validator";

export const userFormValidator = [
  body("aadharNumber")
    .notEmpty().withMessage("Aadhar number is required.")
    .bail()
    .isLength({ min: 12, max: 12 }).withMessage("Aadhar number must be 12 digits.")
    .bail()
    .matches(/^\d{12}$/).withMessage("Aadhar number must contain only digits."),

  body("income")
    .notEmpty().withMessage("Income is required.")
    .bail()
    .isNumeric().withMessage("Income must be a number.")
    .bail()
    .custom((value) => {
      const num = Number(value);
      if (num < 0 || num > 100000) {
        throw new Error("Income must be less than 1 lakh.");
      }
      return true;
    })
];

export const aadharParamValidator = [
  param("aadharNumber")
    .notEmpty().withMessage("Aadhar number is required.")
    .bail()
    .isLength({ min: 12, max: 12 }).withMessage("Aadhar number must be 12 digits.")
    .bail()
    .matches(/^\d{12}$/).withMessage("Aadhar number must contain only digits.")
];