import { useCallback, useRef, useState } from "react";
import { Token, isTokenColor, isTokenValue } from "../../types";

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

export const useBag = (initialItems?: ReadonlyArray<[Token, number]>) => {
  const [items, setItems] = useState<{ [key: TokenKey]: number }>(() => {
    const ret: { [key: TokenKey]: number } = {};

    initialItems?.forEach(([token, count]) => {
      const tokenKey = TokenToKey(token);
      ret[tokenKey] = (ret[tokenKey] ?? 0) + count;
    });

    return ret;
  });
  const totalItemCountRef = useRef<number>(sumWeights(items));

  const maybePick = useCallback(() => {
    if (totalItemCountRef.current === 0) {
      return null;
    }

    const weightedIndex = Math.floor(Math.random() * totalItemCountRef.current);
    let totalWeightCounted = 0;
    for (const [tokenKey, count] of Object.entries(items)) {
      if (count === 0) {
        continue;
      }
      totalWeightCounted += count;

      if (totalWeightCounted >= weightedIndex) {
        setItems((currentItems) => ({ ...currentItems, [tokenKey]: count - 1 }));
        totalItemCountRef.current -= 1;
        return KeyToToken(tokenKey);
      }
    }

    return null;
  }, [items]);

  const pickOrThrow = useCallback(() => {
    const result = maybePick();
    if (result === null) {
      throw new BagError("Bag empty");
    }

    return result;
  }, [maybePick]);

  const add = useCallback((token: Token, count: number = 1) => {
    const tokenKey = TokenToKey(token);
    setItems((currentItems) => ({ ...currentItems, [tokenKey]: (currentItems[tokenKey] ?? 0) + count }));
    totalItemCountRef.current += count;
  }, []);

  return { add, maybePick, pickOrThrow, totalItemCount: totalItemCountRef.current };
};
