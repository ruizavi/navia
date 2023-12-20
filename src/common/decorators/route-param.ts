import { Metadata, MetadataKeys, RouteParamtypes, Type } from "..";
import { ParamsDefinition } from "../interfaces/params.interface";
import { ParserTransform } from "../interfaces/parser";

function createRouteParamDecorator(type: RouteParamtypes) {
  return (data?: string): ParameterDecorator =>
    (target, propertyKey, index) => {
      const metadata = Metadata.init();

      const params: ParamsDefinition[] = metadata.has(
        MetadataKeys.PARAMS,
        target.constructor,
        propertyKey,
      )
        ? metadata.get(MetadataKeys.PARAMS, target.constructor, propertyKey)
        : [];

      params.push({
        data,
        position: index,
        type,
      });

      metadata.set(MetadataKeys.PARAMS, params, target.constructor, propertyKey);
    };
}

function createParsersRouteParamDecorator(type: RouteParamtypes) {
  return (
      data?: string,
      ...parsers: (Type<ParserTransform> | ParserTransform)[]
    ): ParameterDecorator =>
    (target, key, index) => {};
}

export const Req = createRouteParamDecorator(RouteParamtypes.REQUEST);
export const Res = createRouteParamDecorator(RouteParamtypes.RESPONSE);
export const Next = createRouteParamDecorator(RouteParamtypes.NEXT);
export const Param = createRouteParamDecorator(RouteParamtypes.PARAM);
export const Query = createRouteParamDecorator(RouteParamtypes.QUERY);
export const Headers = createRouteParamDecorator(RouteParamtypes.HEADERS);
export const Body = createRouteParamDecorator(RouteParamtypes.BODY);
