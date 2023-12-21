import {
  Body,
  Controller,
  Delete,
  Get,
  IntParser,
  OnAfter,
  OnBefore,
  OnError,
  Param,
  Post,
  Put,
} from "../src";
import { BoolParser } from "../src/common/parsers/bool-parser";
import { After, Before, ErrorHandler, ErrorHandlerInMethod } from "./lifecycle";

@Controller("test")
@OnError(ErrorHandler)
export class Test {
  @Get("")
  @OnBefore(Before)
  @OnAfter(After)
  @OnError(ErrorHandlerInMethod)
  test() {
    return { status: "ok!" };
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
