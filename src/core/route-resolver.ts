import { NextFunction, Request, Response, Router } from "express";
import { Metadata, MetadataKeys, Type } from "..";
import { ParamsDefinition } from "../common/interfaces/params.interface";
import { RouteDefinition } from "../common/interfaces/route.interface";
import { RouteParamsFactory } from "./route-param-resolver";

export class RouteResolver {
  private paramsFactory = new RouteParamsFactory();
  private metadata = Metadata.init();

  resolve(target: Type<any>, router: Router) {
    const routes: RouteDefinition = this.metadata.get(MetadataKeys.ROUTES, target);

    const instance = new target();

    for (const [key, { descriptor, method, path }] of Object.entries(routes)) {
      const builded = this.buildHandler(descriptor, key, target);

      router[method](path, builded.bind(instance));
    }
  }

  private buildHandler(descriptor: any, key: string | symbol, target: Type<any>) {
    const params: ParamsDefinition = this.metadata.get(MetadataKeys.PARAMS, target, key);

    return async (req: Request, res: Response, next: NextFunction) => {
      const args: unknown[] = [];

      for (const { data, type } of Object.values(params)) {
        args.push(this.paramsFactory.changekeyForValue(type, data, { req, res, next }));
      }

      try {
        const returnValue = await descriptor.apply(this, args);

        res.json(returnValue);
      } catch (error) {
        next(error);
      }
    };
  }
}
