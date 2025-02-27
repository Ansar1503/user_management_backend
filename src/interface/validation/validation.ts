import { body } from "express-validator";

export const signupValidation = [
  body("fname").notEmpty().withMessage("First name is required"),
  body("lname").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isInt() 
    .withMessage("Phone number must contain only numbers")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be between 10 and 15 digits"),

  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/) 
    .withMessage("Password must contain at least one special character: @$!%*?&"),
];

export const signinValidation = [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),
];

