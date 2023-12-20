import { Metadata, MetadataKeys, Type } from "..";

export class ControllerResolver {
  private metadata = Metadata.init();

  public resolveBasePath(target: Type<any>) {
    const basePath = this.metadata.get(MetadataKeys.CONTROLLER, target);

    return basePath;
  }
}
