import {  Response } from "express";

export const sendResponse = (
  res: Response,
  statuscode: number,
  data: any,
  message: string
) => {
  const success = statuscode >= 200 && statuscode < 300;
  const response = {
    success,
    status: statuscode,
    message,
    data,
  };
  return res.status(statuscode).json(response);
};
