import { MetadataKeys, addSlash } from "..";
import { Metadata } from "..";

export function Controller(): ClassDecorator;
export function Controller(path: string): ClassDecorator;
export function Controller(path?: string): ClassDecorator {
  const metadata = Metadata.init();

  const controllerPath = addSlash(path);

  return (target) => {
    metadata.set(MetadataKeys.CONTROLLER, controllerPath, target);
  };
}
