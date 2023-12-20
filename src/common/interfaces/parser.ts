import { RouteParamtypes, Type } from "..";

export interface ArgumentMetadata {
  readonly type: RouteParamtypes;
  readonly metatype?: Type<any> | undefined;
  readonly data?: string | undefined;
}

export interface ParserTransform<T = any, R = any> {
  parse(value: T, metadata: ArgumentMetadata): R;
}
