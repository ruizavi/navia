import {
  Body,
  Controller,
  Delete,
  Get,
  IntParser,
  OnAfter,
  OnBefore,
  Param,
  Post,
  Put,
} from "../src";
import { BoolParser } from "../src/common/parsers/bool-parser";
import { After, Before } from "./lifecycle";

@Controller("test")
export class Test {
  @Get(":bool")
  @OnBefore(Before, Before)
  @OnAfter(After, After)
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
