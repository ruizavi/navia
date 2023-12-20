import { Body, Controller, Delete, Get, Param, Post, Put } from "../src";

@Controller("test")
export class Test {
  @Get(":id")
  test(@Param("id") id: string) {
    return { status: "ok!", id };
  }

  @Post(":id")
  post(@Body() body: unknown, @Param("id") id: string) {
    return { body, id };
  }

  @Put("")
  put() {}

  @Delete("")
  delete() {}
}
