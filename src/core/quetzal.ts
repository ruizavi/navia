import { metadata } from "reflect-metadata/no-conflict";
import { Metadata, MetadataKeys } from "..";
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
    console.log(this.metadata.get(MetadataKeys.DOMAIN, this.Root));
  }
}
