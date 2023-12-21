import { Router } from "express";
import { LifeCycleType, Quetzal, Type } from "..";
import { ControllerResolver } from "./controller-resolver";
import { LifeCycleResolver } from "./lifecycle-resolver";
import { RouteResolver } from "./route-resolver";

export class RouterResolver {
  private controllerResolver = new ControllerResolver();
  private routeResolver = new RouteResolver();
  private lifecycleResolver = new LifeCycleResolver();
  private declare application: Quetzal;

  constructor(application: Quetzal) {
    this.application = application;
  }

  resolve(controller: Type<any>) {
    this.registerController(controller);
  }

  private registerController(target: Type<any>) {
    const base = this.controllerResolver.resolveBasePath(target);

    const router = this.generateRouter(target);

    const app = this.application.getApp();

    const before = this.lifecycleResolver.resolve(LifeCycleType.BEFORE, target);
    const after = this.lifecycleResolver.resolve(LifeCycleType.AFTER, target);

    app.use(base, ...before, router, ...after);
  }

  private generateRouter(target: Type<any>) {
    const router = Router();

    this.routeResolver.resolve(target, router);

    return router;
  }
}
