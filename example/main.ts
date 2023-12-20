import { Quetzal } from "../src";
import { Root } from "./app";

function main() {
  const app = Quetzal.create(Root);

  app.start();
}

main();
