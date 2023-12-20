import { NextFunction, Request, Response, Router } from "express";
import { Metadata, MetadataKeys, Type } from "..";
import { ParamsDefinition } from "../common/interfaces/params.interface";
import { RouteDefinition } from "../common/interfaces/route.interface";
import { RouteParamsFactory } from "./route-param-resolver";

export class RouteResolver {
  private paramsFactory = new RouteParamsFactory();
  private metadata = Metadata.init();

  resolve(target: Type<any>, router: Router) {
    const routes: RouteDefinition[] = this.metadata.get(MetadataKeys.ROUTES, target);

    const instance = new target();

    for (const { handler, method, path } of routes) {
      const buildedHandler = this.buildHandler(handler, target);

      router[method](path, buildedHandler.bind(instance));
    }
  }

  private buildHandler(handler: any, target: Type<any>) {
    const params: ParamsDefinition[] = this.metadata.get(MetadataKeys.PARAMS, target);

    return async (req: Request, res: Response, next: NextFunction) => {
      const args: unknown[] = params
        .filter((p) => p.handler === handler.name)
        .sort((a, b) => a.position - b.position)
        .map(({ type, data, parser }) =>
          parser
            ? parser(
                this.paramsFactory.changekeyForValue(type, data, {
                  req,
                  res,
                  next,
                }),
              )
            : this.paramsFactory.changekeyForValue(type, data, {
                req,
                res,
                next,
              }),
        );
      try {
        const returnValue = await handler.descriptor.apply(this, args);

        res.json(returnValue);
      } catch (error) {
        next(error);
      }
    };
  }
}
