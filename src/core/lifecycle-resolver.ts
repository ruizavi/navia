import { NextFunction, Request, Response } from "express";
import { LifeCycle, LifeCycleType, Metadata, Type, isUndefined } from "..";

export class LifeCycleResolver {
  private metadata = Metadata.init();

  public resolve(type: LifeCycleType, target: Type<any>, key?: symbol | string) {
    const handlers = this.metadata.get(type, target, key);

    if (!Array.isArray(handlers)) return [];

    return handlers.map((h) => this.buildLifeCycleMethod(new h()));
  }

  public resolveError(target: Type<any>, key?: symbol | string) {
    const handler = this.metadata.get(LifeCycleType.ERROR, target, key);

    if (isUndefined(handler)) return null;

    const instanceHandler = new handler();

    return async (error: Error, req: Request, res: Response, next: NextFunction) => {
      await instanceHandler.handling({ error, req, res, next });
    };
  }

  private buildLifeCycleMethod(method: LifeCycle) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await method.use({ req, res, next });
    };
  }
}
