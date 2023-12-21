import { NextFunction, Request, Response, Router } from "express";
import { Metadata, MetadataKeys, Type, isUndefined } from "..";
import { ParamsDefinition, RouteDefinition } from "../common";
import {} from "../common";
import { ParserResolver } from "./parser-resolver";
import { RouteParamsFactory } from "./route-param-resolver";

export class RouteResolver {
  private paramsFactory = new RouteParamsFactory();
  private parserResolver = new ParserResolver();
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

      for (const { data, type, parser } of Object.values(params).reverse()) {
        const value = this.paramsFactory.changekeyForValue(type, data, {
          req,
          res,
          next,
        });

        args.push(isUndefined(parser) ? value : await this.parserResolver.resolve(parser, value));
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
