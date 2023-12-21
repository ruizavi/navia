import { RouteParamtypes, Type } from "..";
import { ParserTransform } from "./parser.interface";

export interface ParamsDefinition {
  [key: string]: {
    type: RouteParamtypes;
    position: number;
    data: string | object | any;
    parser?: ParserTransform[];
  };
}
