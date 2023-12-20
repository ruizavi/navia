import { Controller, Delete, Get, Post, Put } from "../src";

@Controller("test")
export class Test {
  @Get("")
  test() {
    return { status: "ok!" };
  }

  @Post("")
  post() {}

  @Put("")
  put() {}

  @Delete("")
  delete() {}
}
