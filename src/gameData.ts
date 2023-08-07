import { Token, TokenColor, TokenValue } from "./types";

export const TokenAllowedValues: Record<TokenColor, ReadonlyArray<TokenValue>> = {
  white: [1, 2, 3],
  red: [1, 2, 4],
  orange: [1],
  yellow: [1, 2, 4],
  green: [1, 2, 4],
  blue: [1, 2, 4],
  purple: [1],
  black: [1],
};

export const DefaultBag: ReadonlyArray<[Token, number]> = [
  [{ color: "white", value: 1 }, 3],
  [{ color: "white", value: 2 }, 2],
  [{ color: "white", value: 3 }, 1],
  [{ color: "orange", value: 1 }, 1],
  [{ color: "green", value: 1 }, 1],
];
