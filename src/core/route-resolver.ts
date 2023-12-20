import { NextFunction, Request, Response, Router } from "express";
import { Metadata, MetadataKeys, Type } from "..";
import { RouteDefinition } from "../common/interfaces/route.interface";

export class RouteResolver {
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
    return async (req: Request, res: Response, next: NextFunction) => {
      const args: unknown[] = [];
      try {
        const returnValue = await handler.descriptor.apply(this, args);

        res.json(returnValue);
      } catch (error) {
        next(error);
      }
    };
  }
}
