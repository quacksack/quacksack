import { Token, isTokenColor, isTokenValue } from "./types";

type TokenKey = string;

export class BagError extends Error {}

const TokenToKey = (token: Token): TokenKey => `${token.color}-${token.value}`;
const KeyToToken = (tokenKey: TokenKey): Token => {
  try {
    const split = tokenKey.split("-");
    const color = split[0];
    if (split[1] === undefined) {
      throw new Error();
    }
    const value = Number.parseInt(split[1], 10);

    if (!isTokenColor(color) || !isTokenValue(value)) {
      throw new Error();
    }

    return {
      color,
      value,
    };
  } catch (e) {
    throw new BagError(`Invalid TokenKey: ${tokenKey}`);
  }
};

const sumWeights = (items: { [key: TokenKey]: number }) =>
  Object.entries(items).reduce((acc, curr) => acc + curr[1], 0);

export class Bag {
  private items: { [key: TokenKey]: number } = {};
  private totalItemCount;

  constructor(initialItems?: ReadonlyArray<[Token, number]>) {
    initialItems?.forEach(([token, count]) => this.add(token, count));
    this.totalItemCount = sumWeights(this.items);
  }

  public getNumTokens() {
    return this.totalItemCount;
  }

  public maybePick() {
    if (this.totalItemCount === 0) {
      return null;
    }

    const weightedIndex = Math.floor(Math.random() * this.totalItemCount);
    let totalWeightCounted = 0;
    for (const [tokenKey, count] of Object.entries(this.items)) {
      totalWeightCounted += count;

      if (totalWeightCounted > weightedIndex) {
        this.items[tokenKey] = count - 1;
        this.totalItemCount -= 1;
        return KeyToToken(tokenKey);
      }
    }

    return null;
  }

  public pickOrThrow() {
    const result = this.maybePick();
    if (result === null) {
      throw new BagError("Bag empty");
    }

    return result;
  }

  public add(token: Token, count: number = 1) {
    const tokenKey = TokenToKey(token);
    this.items[tokenKey] = (this.items[tokenKey] ?? 0) + count;
    this.totalItemCount += count;
  }
}
