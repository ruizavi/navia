import { Body, Controller, Delete, Get, IntParser, Param, Post, Put } from "../src";
import { BoolParser } from "../src/common/parsers/bool-parser";

@Controller("test")
export class Test {
  @Get(":bool")
  test(@Param("bool", new BoolParser()) id: string) {
    return { status: "ok!", id };
  }

  @Post(":id")
  post(@Body() body: unknown, @Param("id", new IntParser()) id: number) {
    return { body, id };
  }

  @Put("")
  put() {}

  @Delete("")
  delete() {}
}
