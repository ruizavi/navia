import { RequestMethod } from "../enums";

export interface RouteDefinition {
  path: string;
  handler: {
    name: string | symbol;
    descriptor: any;
  };
  method: RequestMethod;
}
