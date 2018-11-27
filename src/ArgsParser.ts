import PuzzleVariant from './PuzzleVariant';

class ArgsParser {
  public static parse(args: string[]): { day: number; variant: PuzzleVariant } {
    const customArgs = args.slice(2);
    if (customArgs.length < 2) {
      throw new Error('Incorrent number of arguments.\nUsage: yarn|npm start <day 1-25> <variant 1|2>');
    }

    const day = parseInt(customArgs[0], 10);
    const variant = parseInt(customArgs[1], 10);

    if (isNaN(day) || isNaN(variant)) {
      throw new Error('Incorrent arguments.\nUsage: yarn|npm start <day 1-25> <variant 1|2>');
    }

    if (variant !== 1 && variant !== 2) {
      throw new Error('Incorrent arguments.\nUsage: yarn|npm start <day 1-25> <variant 1|2>');
    }

    return {
      day,
      variant,
    };
  }
}

export default ArgsParser;
