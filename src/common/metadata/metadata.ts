import "reflect-metadata";
import { isFunction, isObject, isUndefined } from "../utils/is.util";

class Metadata {
  private static instance: Metadata;

  private constructor() {}

  public static init() {
    if (!Metadata.instance) {
      Metadata.instance = new Metadata();
    }

    return Metadata.instance;
  }

  public get(metadataKey: unknown, target: unknown, key?: symbol | string) {
    return isFunction(target)
      ? isUndefined(key)
        ? Reflect.getMetadata(metadataKey, target)
        : Reflect.getMetadata(metadataKey, target, key)
      : null;
  }

  public set(metadataKey: unknown, metadataValue: unknown, target: unknown, key?: string | symbol) {
    return isFunction(target)
      ? isUndefined(key)
        ? Reflect.defineMetadata(metadataKey, metadataValue, target)
        : Reflect.defineMetadata(metadataKey, metadataValue, target, key)
      : null;
  }

  public has(metadataKey: unknown, target: unknown, key?: symbol | string) {
    return isFunction(target)
      ? isUndefined(key)
        ? Reflect.hasMetadata(metadataKey, target)
        : Reflect.hasMetadata(metadataKey, target, key)
      : false;
  }
}

export default Metadata;
