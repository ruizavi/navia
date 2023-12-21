import { Context, ErrorContext, ErrorHandling, LifeCycle } from "../src";

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

export class ErrorHandler implements ErrorHandling {
  async handling({ res, error }: ErrorContext): Promise<void> {
    console.log(error);
    res.json({ message: "Algo salio mal =(" });
  }
}

export class ErrorHandlerInMethod implements ErrorHandling {
  async handling({ res, error }: ErrorContext): Promise<void> {
    console.log(error);
    res.json({ message: "Algo salio mal =( en el metodo" });
  }
}
