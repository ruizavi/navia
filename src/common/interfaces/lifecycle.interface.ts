import { NextFunction, Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  next: NextFunction;
}
export interface ErrorContext extends Context {
  error: Error;
}

export interface LifeCycle {
  use(context: Context): Promise<void>;
}

export interface ErrorHandling {
  handling(context: ErrorContext): Promise<void>;
}
