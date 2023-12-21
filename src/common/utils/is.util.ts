export const IsNull = (val: unknown): val is null | undefined => isUndefined(val) || val === null;

export const isUndefined = (obj: any): obj is undefined => typeof obj === "undefined";

export const isObject = (fn: unknown): fn is object => !IsNull(fn) && typeof fn === "object";

export const isFunction = (val: any): val is Function => typeof val === "function";

export const addSlash = (path?: string): string =>
  path && typeof path === "string" ? (path.charAt(0) !== "/" ? `/${path}` : path) : "";

export const isString = (val: any): val is string => typeof val === "string";
