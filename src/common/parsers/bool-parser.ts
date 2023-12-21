import { HttpStatus, IsNull } from "..";
import { ParserTransform } from "../interfaces";

export interface BoolParseOptions {
  optional?: boolean;
  errorHttpStatus?: HttpStatus;
}

export class BoolParser implements ParserTransform<boolean | string, Promise<boolean>> {
  constructor(protected readonly options: BoolParseOptions = {}) {}

  async transform(value: string | boolean): Promise<boolean> {
    if (IsNull(value) && this.options.optional) return value;

    if (value === "true" || value === true) return true;

    if (value === "false" || value === false) return false;

    throw new Error();
  }
}
