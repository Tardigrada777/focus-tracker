interface ParsedArg {
  key: string;
  value: string;
}

export type parseArgUtil = (arg: string) => ParsedArg;

export const parseArg: parseArgUtil = (arg: string): ParsedArg => {
  const [key, value] = arg.split('=')
  return {key, value}
}
