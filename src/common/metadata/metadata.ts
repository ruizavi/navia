import "reflect-metadata";
import { isFunction, isObject } from "../utils/is.util";

class Metadata {
  private static instance: Metadata;

  private constructor() {}

  public static init() {
    if (!Metadata.instance) {
      Metadata.instance = new Metadata();
    }

    return Metadata.instance;
  }

  public get(key: unknown, target: unknown) {
    if (isFunction(target)) return Reflect.getMetadata(key, target);
  }

  public set(key: unknown, value: unknown, target: unknown) {
    if (isFunction(target)) return Reflect.defineMetadata(key, value, target);
  }

  public has(key: unknown, target: unknown) {
    if (isFunction(target)) return Reflect.hasMetadata(key, target);
  }
}

export default Metadata;
