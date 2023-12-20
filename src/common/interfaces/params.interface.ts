import { RouteParamtypes, Type } from "..";
import { ParserTransform } from "./parser";

export interface ParamsDefinition {
  [key: string]: {
    type: RouteParamtypes;
    position: number;
    data: string | object | any;
    parser?: (Type<ParserTransform> | ParserTransform)[];
  };
}
