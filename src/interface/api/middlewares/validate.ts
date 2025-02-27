import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUS_CODES } from "../../../shared/statuscodes";
import { sendResponse } from "../../../shared/response";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        sendResponse(
            res,
            HTTP_STATUS_CODES.BAD_REQUEST,
            errors.array(),
            "validation error"
        )
        return
    }
    next()  
};
 