import { RouteParamtypes, Type } from "..";

export interface ParserTransform<T = any, R = any> {
  parse(value: T): R;
}
