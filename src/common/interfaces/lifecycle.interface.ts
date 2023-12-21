import { NextFunction, Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface LifeCycle {
  use(context: Context): Promise<void>;
}
