import { Response } from "express";

const throwError = (
  res: Response,
  statusCode: number,
  message: string
): never => {
  res.status(statusCode);
  throw new Error(message);
};

export default throwError;