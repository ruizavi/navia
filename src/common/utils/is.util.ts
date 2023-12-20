export const IsNull = (val: unknown): val is null | undefined => isUndefined(val) || val === null;

export const isUndefined = (obj: any): obj is undefined => typeof obj === "undefined";

export const isObject = (fn: unknown): fn is object => !IsNull(fn) && typeof fn === "object";
