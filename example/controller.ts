import { Body, Controller, Delete, Get, IntParser, Param, Post, Put } from "../src";

@Controller("test")
export class Test {
  @Get(":id")
  test(@Param("id") id: string) {
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
