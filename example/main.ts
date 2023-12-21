import { Navia } from "../src";
import { Root } from "./app";

function main() {
  const app = Navia.create(Root);

  app.start(300);
}

main();
