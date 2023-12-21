import express, { Application } from "express";
import { Type } from "../common";
import { DomainResolver } from "./domain-resolver";

export class Parrot {
  private static parrot: Parrot;

  private declare domain: Type<any>;
  private declare app: Application;

  private constructor(root: Type<any>) {
    this.domain = root;
    this.app = express();
  }

  static create(root: Type<any>) {
    if (!Parrot.parrot) Parrot.parrot = new Parrot(root);

    return Parrot.parrot;
  }

  public getApp() {
    return this.app;
  }

  public start(port: number) {
    this.app.use(express.json());

    const domainResolver = new DomainResolver(this.domain, Parrot.parrot);

    domainResolver.resolve();

    this.app.listen(port, () => {
      console.log("activo");
    });
  }
}
