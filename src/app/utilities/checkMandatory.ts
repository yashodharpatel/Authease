import throwError from "#utilities/throwError";
import { Response } from "express";

const checkMandatory = (field: string, fieldName: string, res: Response) => {
  if (!field) {
    throwError(res, 400, `${fieldName} cannot be blank`);
  }
};

export default checkMandatory;