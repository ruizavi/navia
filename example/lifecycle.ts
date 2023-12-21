import { Context, LifeCycle } from "../src";

export class After implements LifeCycle {
  async use({ next }: Context): Promise<void> {
    console.log("after");

    next();
  }
}

export class Before implements LifeCycle {
  async use({ next }: Context): Promise<void> {
    console.log("before");

    next();
  }
}
