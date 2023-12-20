import { Body, Controller, Delete, Get, Param, Post, Put } from "../src";

@Controller("test")
export class Test {
  @Get(":id")
  test(@Param("id") id: string) {
    return { status: "ok!", id };
  }

  @Post("")
  post(@Body() body: any) {
    return body;
  }

  @Put("")
  put() {}

  @Delete("")
  delete() {}
}
