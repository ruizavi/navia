import { Metadata, MetadataKeys, RouteParamtypes } from "..";
import { ParamsDefinition } from "../interfaces/params.interface";

function createRouteParamDecorator(type: RouteParamtypes) {
  return (data?: string): ParameterDecorator =>
    (target, propertyKey, index) => {
      const metadata = Metadata.init();

      const params: ParamsDefinition[] = metadata.has(MetadataKeys.PARAMS, target.constructor)
        ? metadata.get(MetadataKeys.PARAMS, target.constructor)
        : [];

      if (propertyKey)
        params.push({
          data,
          handler: propertyKey,
          position: index,
          type,
        });

      metadata.set(MetadataKeys.PARAMS, params, target.constructor);
    };
}

export const Req = createRouteParamDecorator(RouteParamtypes.REQUEST);
export const Res = createRouteParamDecorator(RouteParamtypes.RESPONSE);
export const Next = createRouteParamDecorator(RouteParamtypes.NEXT);
export const Param = createRouteParamDecorator(RouteParamtypes.PARAM);
export const Query = createRouteParamDecorator(RouteParamtypes.QUERY);
export const Headers = createRouteParamDecorator(RouteParamtypes.HEADERS);
export const Body = createRouteParamDecorator(RouteParamtypes.BODY);
export const User = createRouteParamDecorator(RouteParamtypes.USER);
export const File = createRouteParamDecorator(RouteParamtypes.FILE);
export const Files = createRouteParamDecorator(RouteParamtypes.FILES);
