import { RequestMethod } from "../enums";

export interface Handler {
  name: string | symbol;
  descriptor: any;
}

export interface RouteDefinition {
  path: string;
  handler: Handler;
  method: RequestMethod;
}
