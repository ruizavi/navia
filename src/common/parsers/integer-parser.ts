import { HttpStatus, IsNull } from "..";
import { ParserTransform } from "../interfaces";

export interface IntParseOptions {
  optional?: boolean;
  errorHttpStatus?: HttpStatus;
}

export class IntParser implements ParserTransform<string> {
  constructor(protected readonly options: IntParseOptions = {}) {}

  async parse(value: string): Promise<number> {
    if (IsNull(value) && this.options?.optional) {
      return value;
    }

    if (!this.isNumeric(value)) {
      throw new Error();
    }

    return parseInt(value, 10);
  }

  protected isNumeric(value: string) {
    const isInt = /^-?\d+$/;

    return (
      ["string", "number"].includes(typeof value) && isInt.test(value) && isFinite(value as any)
    );
  }
}
