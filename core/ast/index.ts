import { Span, Token } from "../parser/recursive-descent-parser.ts";
import { Constant, Dot, Empty, FullIdent, StrLit } from "./lexical-elements.ts";
import { Enum, Extend, Message, Service } from "./top-level-definitions.ts";

export interface Proto {
  statements: TopLevelStatement[];
}
export type TopLevelStatement =
  | Syntax
  | Import
  | Package
  | Option
  | TopLevelDef
  | Empty;

export type TopLevelDef = Message | Enum | Extend | Service;

export interface StatementBase extends Span {
  leadingComments: Token[];
  trailingComments: Token[];
  leadingDetachedComments: Token[];
}

export interface Syntax extends StatementBase {
  type: "syntax";
  keyword: Token;
  eq: Token;
  quoteOpen: Token;
  syntax: Token;
  quoteClose: Token;
  semi: Token;
}

export interface Import extends StatementBase {
  type: "import";
  keyword: Token;
  weakOrPublic: Token;
  strLit: StrLit;
  semi: Token;
}

export interface Package extends StatementBase {
  type: "package";
  keyword: Token;
  fullIdent: FullIdent;
  semi: Token;
}

export interface Option extends StatementBase {
  type: "option";
  keyword: Token;
  optionName: OptionName;
  eq: Token;
  constant: Constant;
  semi: Token;
}

export interface OptionName extends Span {
  type: "option-name";
  optionNameSegmentOrDots: (OptionNameSegment | Dot)[];
}

export interface OptionNameSegment extends Span {
  type: "option-name-segment";
  bracketOpen?: Token;
  name: FullIdent;
  bracketClose?: Token;
}
