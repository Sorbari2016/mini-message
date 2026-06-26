import { body } from "express-validator";

const validateMessage = () => {
  return [
    body("messageText")
      .trim()
      .notEmpty()
      .withMessage("message is required")
      .isLength({ max: 300 })
      .withMessage("message must not exceed 300 characters")
      .escape(),
    body("messageUser")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 1, max: 10 })
      .withMessage("Usename must be between 3 and 10 characters long")
      .escape()
      .custom((value) => {
        if (/^\d+$/.test(value)) {
          throw new Error("Username cannot be made entirely of numbers");
        }
        return true;
      }),
  ];
};

export default validateMessage;
