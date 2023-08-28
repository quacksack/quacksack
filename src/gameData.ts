import { Token, TokenColor, TokenValue } from "./types";

export const ShopData: ReadonlyArray<[TokenColor, ReadonlyArray<TokenValue>]> = [
  ["orange", [1, 6]],
  ["green", [1, 2, 4]],
  ["blue", [1, 2, 4]],
  ["red", [1, 2, 4]],
  ["black", [1]],
  ["yellow", [1, 2, 4]],
  ["purple", [1]],
  ["dark green", [0]],
  ["white", [1, 2, 3]],
];

export const DefaultBag: ReadonlyArray<[Token, number]> = [
  [{ color: "white", value: 1 }, 4],
  [{ color: "white", value: 2 }, 2],
  [{ color: "white", value: 3 }, 1],
  [{ color: "orange", value: 1 }, 1],
  [{ color: "green", value: 1 }, 1],
];
