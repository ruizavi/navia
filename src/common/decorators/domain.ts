import { Metadata } from "..";
import { MetadataKeys } from "../enums";
import { Type } from "../interfaces";

/**
 * @publicApi
 */
export interface DomainOptions {
  controllers: Type<any>[];
}

export function Domain(options: DomainOptions): ClassDecorator {
  const metadata = Metadata.init();
  return (target) => {
    metadata.set(MetadataKeys.DOMAIN, options, target);
  };
}
