import { metadata } from "reflect-metadata/no-conflict";
import { DomainOptions, Metadata, MetadataKeys } from "..";
import { Type } from "../common/interfaces/type.interface";

export class Quetzal {
  private static quetzal: Quetzal;
  private metadata = Metadata.init();
  private declare Root: Type<any>;

  private constructor(root: Type<any>) {
    this.Root = root;
  }

  static create(root: Type<any>) {
    if (!Quetzal.quetzal) Quetzal.quetzal = new Quetzal(root);

    return Quetzal.quetzal;
  }

  public start() {
    const options: DomainOptions = this.metadata.get(MetadataKeys.DOMAIN, this.Root);
    console.log(options);

    for (const controller of options.controllers) {
      console.log(this.metadata.get(MetadataKeys.CONTROLLER, controller));

      console.log(this.metadata.get(MetadataKeys.ROUTES, controller));
    }
  }
}
