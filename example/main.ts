import { Parrot } from "../src";
import { Root } from "./app";

function main() {
  const app = Parrot.create(Root);

  app.start(300);
}

main();
