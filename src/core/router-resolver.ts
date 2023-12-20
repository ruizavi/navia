import { Router } from "express";
import { Quetzal, Type } from "..";
import { ControllerResolver } from "./controller-resolver";
import { RouteResolver } from "./route-resolver";

export class RouterResolver {
  private controllerResolver = new ControllerResolver();
  private routeResolver = new RouteResolver();
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

    app.use(base, router);
  }

  private generateRouter(target: Type<any>) {
    const router = Router();

    this.routeResolver.resolve(target, router);

    return router;
  }
}
