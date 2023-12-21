import { RouteParamtypes, Type } from "..";

export interface ParserTransform<T = any, R = any> {
  transform(value: T): R;
}
