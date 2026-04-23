// export const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  <T extends Request>(
    fn: (req: T, res: Response, next: NextFunction) => Promise<any>,
  ) =>
  (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
