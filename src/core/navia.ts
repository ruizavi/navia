import express, { Application } from "express";
import { Type } from "../common";
import { DomainResolver } from "./domain-resolver";

export class Navia {
  private static navia: Navia;

  private declare domain: Type<any>;
  private declare app: Application;

  private constructor(root: Type<any>) {
    this.domain = root;
    this.app = express();
  }

  static create(root: Type<any>) {
    if (!Navia.navia) Navia.navia = new Navia(root);

    return Navia.navia;
  }

  public getApp() {
    return this.app;
  }

  public start(port: number) {
    this.app.use(express.json());

    const domainResolver = new DomainResolver(this.domain, Navia.navia);

    domainResolver.resolve();

    this.app.listen(port, () => {
      console.log("activo");
    });
  }
}
