import { DomainOptions, Metadata, MetadataKeys, Navia, Type } from "..";
import { RouterResolver } from "./router-resolver";

export class DomainResolver {
  private metadata = Metadata.init();
  private declare domain: Type<any>;
  private declare routerResolver: RouterResolver;

  constructor(domain: Type<any>, application: Navia) {
    this.domain = domain;
    this.routerResolver = new RouterResolver(application);
  }

  public resolve() {
    const options: DomainOptions = this.metadata.get(MetadataKeys.DOMAIN, this.domain);

    for (const controller of options.controllers) {
      this.routerResolver.resolve(controller);
    }
  }
}
