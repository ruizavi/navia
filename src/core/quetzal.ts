import express, { Application } from "express";
import { Type } from "../common";
import { DomainResolver } from "./domain-resolver";

export class Quetzal {
  private static quetzal: Quetzal;

  private declare domain: Type<any>;
  private declare app: Application;

  private constructor(root: Type<any>) {
    this.domain = root;
    this.app = express();
  }

  static create(root: Type<any>) {
    if (!Quetzal.quetzal) Quetzal.quetzal = new Quetzal(root);

    return Quetzal.quetzal;
  }

  public getApp() {
    return this.app;
  }

  public start(port: number) {
    this.app.use(express.json());

    const domainResolver = new DomainResolver(this.domain, Quetzal.quetzal);

    domainResolver.resolve();

    this.app.listen(port, () => {
      console.log("activo");
    });
  }
}
