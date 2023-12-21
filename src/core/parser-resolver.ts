import { ParserTransform } from "../common";

export class ParserResolver {
  async resolve(parsers: ParserTransform[], value: unknown) {
    return parsers.reduce(async (deferred, parser) => {
      const parsed = await deferred;

      const result = parser.transform(parsed);

      return result;
    }, Promise.resolve(value));
  }
}
