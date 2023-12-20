import { useCallback, useMemo, useRef, useState } from "react";
import { Token, isTokenColor, isTokenValue } from "../../types";
import { BagApi, BagError, BagItems, MaxTokenCount } from "./types";

type TokenKey = string;

const tokenToKey = (token: Token): TokenKey => `${token.color}-${token.value}`;
const keyToToken = (tokenKey: TokenKey): Token => {
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

const bagItemsToMap = (items: BagItems | undefined) => {
  const bagMap: { [key: TokenKey]: number } = {};

  items?.forEach(([token, count]) => {
    const tokenKey = tokenToKey(token);
    bagMap[tokenKey] = (bagMap[tokenKey] ?? 0) + count;
  });

  return bagMap;
};

const bagMapToBagItems = (items: { [key: TokenKey]: number }): ReadonlyArray<[Token, number]> => {
  return Object.entries(items).map(([tokenKey, count]) => {
    const token = keyToToken(tokenKey);
    return [token, count];
  });
};

export const useBag = (initialItems?: BagItems): BagApi => {
  const [items, setItemsInternal] = useState<{ [key: TokenKey]: number }>(() => bagItemsToMap(initialItems));
  const totalItemCountRef = useRef<number>(sumWeights(items));

  const maybePick = useCallback(() => {
    if (totalItemCountRef.current === 0) {
      return null;
    }

    // very naive but I don't need to be clever here
    const weightedIndex = Math.floor(Math.random() * totalItemCountRef.current);
    const longArray = Object.entries(items).flatMap(([tokenKey, count]) =>
      Array.from({ length: count }).map(() => tokenKey),
    );
    const chosenTokenKey = longArray[weightedIndex];
    if (chosenTokenKey === undefined) {
      return null;
    }
    setItemsInternal((currentItems) => ({ ...currentItems, [chosenTokenKey]: currentItems[chosenTokenKey]! - 1 }));
    totalItemCountRef.current -= 1;
    return keyToToken(chosenTokenKey);
  }, [items]);

  const pickOrThrow = useCallback(() => {
    const result = maybePick();
    if (result === null) {
      throw new BagError("Bag empty");
    }

    return result;
  }, [maybePick]);

  const add = useCallback((token: Token, maybeCount?: number) => {
    const count = maybeCount ?? 1;
    if (totalItemCountRef.current + count > MaxTokenCount) {
      throw new BagError(`Bag can't contain more than ${MaxTokenCount} tokens`);
    }
    const tokenKey = tokenToKey(token);
    setItemsInternal((currentItems) => ({ ...currentItems, [tokenKey]: (currentItems[tokenKey] ?? 0) + count }));
    totalItemCountRef.current += count;
  }, []);

  const maybeDeleteToken = useCallback(
    (token: Token, maybeCount?: number) => {
      const count = maybeCount ?? 1;
      const tokenKey = tokenToKey(token);
      const currentCount = items[tokenKey] ?? 0;

      if (currentCount >= count) {
        setItemsInternal((currentItems) => ({ ...currentItems, [tokenKey]: (currentItems[tokenKey] ?? 0) - count }));
        totalItemCountRef.current -= count;

        return token;
      } else {
        return null;
      }
    },
    [items],
  );

  const setItems = useCallback((newItems: BagItems) => {
    const newItemsMap = bagItemsToMap(newItems);
    setItemsInternal(newItemsMap);
    totalItemCountRef.current = sumWeights(newItemsMap);
  }, []);

  return useMemo(
    () => ({
      add,
      maybePick,
      pickOrThrow,
      totalItemCount: totalItemCountRef.current,
      setItems,
      maybeDelete: maybeDeleteToken,
      items: bagMapToBagItems(items),
    }),
    [add, maybePick, pickOrThrow, setItems, maybeDeleteToken, items],
  );
};
