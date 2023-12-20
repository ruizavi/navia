import { NextFunction, Request, Response } from "express";
import { match } from "ts-pattern";
import { RouteParamtypes } from "..";

export class RouteParamsFactory {
  public changekeyForValue<
    TRequest extends Request,
    TResponse extends Response,
    TNextFunction extends NextFunction,
  >(
    key: RouteParamtypes | string,
    data: string | object | any,
    { req, res, next }: { req: TRequest; res: TResponse; next: TNextFunction },
  ): any {
    return match(key)
      .with(RouteParamtypes.NEXT, () => next as any)
      .with(RouteParamtypes.REQUEST, () => req as any)
      .with(RouteParamtypes.RESPONSE, () => res as any)
      .with(RouteParamtypes.BODY, () => (data && req.body ? req.body[data] : req.body))
      .with(RouteParamtypes.PARAM, () => (data ? req.params[data] : req.params))
      .with(RouteParamtypes.QUERY, () => (data ? req.query[data] : req.query))
      .with(RouteParamtypes.HEADERS, () => (data ? req.headers[data] : req.headers))
      .otherwise(() => null);
  }
}
