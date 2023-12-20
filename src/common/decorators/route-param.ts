import { Metadata, MetadataKeys, RouteParamtypes, Type } from "..";
import { ParamsDefinition } from "../interfaces/params.interface";
import { ParserTransform } from "../interfaces/parser";

function createRouteParamDecorator(type: RouteParamtypes) {
  return (data?: string): ParameterDecorator =>
    (target, propertyKey, index) => {
      const metadata = Metadata.init();

      const args: ParamsDefinition = metadata.has(
        MetadataKeys.PARAMS,
        target.constructor,
        propertyKey,
      )
        ? metadata.get(MetadataKeys.PARAMS, target.constructor, propertyKey)
        : {};

      metadata.set(
        MetadataKeys.PARAMS,
        {
          [`${type}:${index}`]: {
            type,
            position: index,
            data,
          },
          ...args,
        },
        target.constructor,
        propertyKey,
      );
    };
}

function createParsersRouteParamDecorator(type: RouteParamtypes) {
  return (
      data?: string,
      ...parsers: (Type<ParserTransform> | ParserTransform)[]
    ): ParameterDecorator =>
    (target, key, index) => {
      const metadata = Metadata.init();

      const args: ParamsDefinition = metadata.has(MetadataKeys.PARAMS, target.constructor, key)
        ? metadata.get(MetadataKeys.PARAMS, target.constructor, key)
        : {};

      metadata.set(
        MetadataKeys.PARAMS,
        {
          [`${type}:${index}`]: {
            type,
            position: index,
            data,
            parsers,
          },
          ...args,
        },
        target,
        key,
      );
    };
}

export const Req = createRouteParamDecorator(RouteParamtypes.REQUEST);
export const Res = createRouteParamDecorator(RouteParamtypes.RESPONSE);
export const Next = createRouteParamDecorator(RouteParamtypes.NEXT);
export const Param = createRouteParamDecorator(RouteParamtypes.PARAM);
export const Query = createRouteParamDecorator(RouteParamtypes.QUERY);
export const Headers = createRouteParamDecorator(RouteParamtypes.HEADERS);
export const Body = createRouteParamDecorator(RouteParamtypes.BODY);
