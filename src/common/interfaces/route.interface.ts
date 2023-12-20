import { RequestMethod } from "../enums";

export interface RouteDefinition {
  [key: string | symbol]: {
    path: string;
    descriptor: any;
    method: RequestMethod;
  };
}
