import { NextFunction, Request, Response } from "express";
import { LifeCycle, LifeCycleType, Metadata, Type } from "..";

export class LifeCycleResolver {
  private metadata = Metadata.init();

  public resolve(type: LifeCycleType, target: Type<any>, key?: symbol | string) {
    const handlers = this.metadata.get(type, target, key);

    if (!Array.isArray(handlers)) return [];

    console.log({ type, handlers, key });

    return handlers.map((h) => this.buildLifeCycleMethod(new h()));
  }

  private buildLifeCycleMethod(method: LifeCycle) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await method.use({ req, res, next });
    };
  }
}
