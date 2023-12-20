import { Domain } from "../src";
import { Test } from "./controller";

@Domain({ controllers: [Test] })
export class Root {}
