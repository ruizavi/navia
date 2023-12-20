import { RouteParamtypes } from "..";

export interface ParamsDefinition {
  type: RouteParamtypes;
  position: number;
  data: string | object | any;
  handler: string | symbol;
  parser?: any;
}
