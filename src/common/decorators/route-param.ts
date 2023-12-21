import { IsNull, Metadata, MetadataKeys, RouteParamtypes, Type, isString, isUndefined } from "..";
import { ParserTransform } from "../interfaces/parser.interface";

export type ParamData = object | string | number;
export interface RouteParamMetadata {
  index: number;
  data?: ParamData;
}

export function assignMetadata<TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: ParamData,
  ...parser: (Type<ParserTransform> | ParserTransform)[]
) {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      type: paramtype,
      index,
      data,
      parser,
    },
  };
}

function createRouteParamDecorator(type: RouteParamtypes) {
  return (data?: ParamData): ParameterDecorator =>
    (target, propertyKey, index) => {
      const metadata = Metadata.init();

      const args = metadata.get(MetadataKeys.PARAMS, target.constructor, propertyKey) || {};

      metadata.set(
        MetadataKeys.PARAMS,
        assignMetadata<RouteParamtypes, Record<number, RouteParamMetadata>>(
          args,
          type,
          index,
          data,
        ),
        target.constructor,
        propertyKey,
      );
    };
}

function createParserRouteParamDecorator(paramtype: RouteParamtypes) {
  return (
      data?: any,
      ...parsers: (Type<ParserTransform> | ParserTransform)[]
    ): ParameterDecorator =>
    (target, key, index) => {
      const metadata = Metadata.init();

      const args = metadata.get(MetadataKeys.PARAMS, target.constructor, key) || {};

      const hasParamData = isUndefined(data) || isString(data);
      const paramData = hasParamData ? data : undefined;
      const paramParsers = hasParamData ? parsers : [data, ...parsers];

      metadata.set(
        MetadataKeys.PARAMS,
        assignMetadata(args, paramtype, index, paramData, ...paramParsers),
        target.constructor,
        key,
      );
    };
}

export const Req = createRouteParamDecorator(RouteParamtypes.REQUEST);
export const Res = createRouteParamDecorator(RouteParamtypes.RESPONSE);
export const Next = createRouteParamDecorator(RouteParamtypes.NEXT);

export function Query(): ParameterDecorator;
export function Query(...parsers: (Type<ParserTransform> | ParserTransform)[]): ParameterDecorator;
export function Query(
  data: string,
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator;
export function Query(
  data?: string | (Type<ParserTransform> | ParserTransform),
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator {
  return createParserRouteParamDecorator(RouteParamtypes.QUERY)(data, ...parsers);
}

export function Param(): ParameterDecorator;
export function Param(...parsers: (Type<ParserTransform> | ParserTransform)[]): ParameterDecorator;
export function Param(
  data: string,
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator;
export function Param(
  data?: string | (Type<ParserTransform> | ParserTransform),
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator {
  return createParserRouteParamDecorator(RouteParamtypes.PARAM)(data, ...parsers);
}

export function Body(): ParameterDecorator;
export function Body(...parsers: (Type<ParserTransform> | ParserTransform)[]): ParameterDecorator;
export function Body(
  data: string,
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator;
export function Body(
  data?: string | (Type<ParserTransform> | ParserTransform),
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator {
  return createParserRouteParamDecorator(RouteParamtypes.BODY)(data, ...parsers);
}

export function Headers(): ParameterDecorator;
export function Headers(
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator;
export function Headers(
  data: string,
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator;
export function Headers(
  data?: string | (Type<ParserTransform> | ParserTransform),
  ...parsers: (Type<ParserTransform> | ParserTransform)[]
): ParameterDecorator {
  return createParserRouteParamDecorator(RouteParamtypes.HEADERS)(data, ...parsers);
}
