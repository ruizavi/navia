import { Metadata, addSlash } from "..";
import { MetadataKeys, RequestMethod } from "../enums";
import { RouteDefinition } from "../interfaces/route.interface";

function requestMethodFactory(method: RequestMethod) {
  return (prefix: string): MethodDecorator => {
    const path = addSlash(prefix);

    const metadata = Metadata.init();
    return (target, propertyKey, descriptor) => {
      const routes: RouteDefinition[] = metadata.has(MetadataKeys.ROUTES, target.constructor)
        ? metadata.get(MetadataKeys.ROUTES, target.constructor)
        : [];

      routes.push({
        handler: { descriptor: descriptor.value, name: propertyKey },
        method,
        path,
      });

      metadata.set(MetadataKeys.ROUTES, routes, target.constructor);
    };
  };
}

export const All = requestMethodFactory(RequestMethod.ALL);
export const Delete = requestMethodFactory(RequestMethod.DELETE);
export const Get = requestMethodFactory(RequestMethod.GET);
export const Head = requestMethodFactory(RequestMethod.HEAD);
export const Options = requestMethodFactory(RequestMethod.OPTIONS);
export const Patch = requestMethodFactory(RequestMethod.PATCH);
export const Post = requestMethodFactory(RequestMethod.POST);
export const Put = requestMethodFactory(RequestMethod.PUT);
export const Search = requestMethodFactory(RequestMethod.SEARCH);
