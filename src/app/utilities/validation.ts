import throwError from "#utilities/throwError";
import { Response } from "express";

const validateEmail = (email: string, res: Response) => {
  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!regEx.test(email)) {
    throwError(res, 400, "Please enter a valid email address");
  }
};

const validatePassword = (password: string, res: Response) => {
  const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (!regEx.test(password)) {
    throwError(res, 400, "Password is not strong enough");
  }
};

export default { validateEmail, validatePassword };