import { LifeCycleType, Metadata, Type, isFunction, validateEach } from "..";
import { ErrorHandling, LifeCycle } from "../interfaces/lifecycle.interface";

export function lifeCycleFactory(type: LifeCycleType) {
  return (...handlers: (Type<LifeCycle> | LifeCycle)[]): MethodDecorator & ClassDecorator =>
    (target: any, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
      const metadata = Metadata.init();

      const isValidHandler = <T extends Function | Record<string, any>>(handler: T) =>
        handler && (isFunction(handler) || isFunction((handler as Record<string, any>).use));

      if (descriptor) {
        const previous = metadata.get(type, target.constructor, key) || [];

        validateEach(target.constructor, handlers, isValidHandler, "@LifeCycle", "handler");

        metadata.set(type, [...previous, ...handlers], target.constructor, key);

        return descriptor;
      }

      const previous = metadata.get(type, target) || [];

      validateEach(target, handlers, isValidHandler, "@LifeCycle", "handler");

      metadata.set(type, [...previous, ...handlers], target.constructor, key);

      return target;
    };
}

export const OnBefore = lifeCycleFactory(LifeCycleType.BEFORE);
export const OnAfter = lifeCycleFactory(LifeCycleType.AFTER);

export function OnError(
  handler: Type<ErrorHandling> | ErrorHandling,
): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
    const metadata = Metadata.init();

    const isValidHandler = <T extends Function | Record<string, any>>(handler: T) =>
      handler && (isFunction(handler) || isFunction((handler as Record<string, any>).handling));

    if (!isValidHandler(handler)) throw new Error();

    if (descriptor) {
      metadata.set(LifeCycleType.ERROR, handler, target.constructor, key);

      return descriptor;
    }

    metadata.set(LifeCycleType.ERROR, handler, target);

    return target;
  };
}
