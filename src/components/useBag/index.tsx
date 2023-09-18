import { useCallback, useMemo, useRef, useState } from "react";
import { Token, isTokenColor, isTokenValue } from "../../types";
import { BagApi, BagError, BagOperationHistory, BagItems, MaxTokenCount, BagOperation } from "./types";

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

// 10 seconds
const IntervalUntilNewOperationHistorySection = 10 * 1000;

export const useBag = (initialItems?: BagItems): BagApi => {
  const [items, setItemsInternal] = useState<{ [key: TokenKey]: number }>(() => bagItemsToMap(initialItems));
  const [lastOperationTime, setLastOperationTime] = useState<ReturnType<typeof Date.now>>(0);
  const [history, setHistory] = useState<BagOperationHistory>([]);
  const totalItemCountRef = useRef<number>(sumWeights(items));

  // Record item add and remove events
  const recordHistory = useCallback(
    (operation: BagOperation) => {
      const operationTime = Date.now();
      const oldLastOperationTime = lastOperationTime;

      setLastOperationTime(operationTime);

      setHistory((oldHistory) => {
        if (operationTime - oldLastOperationTime > IntervalUntilNewOperationHistorySection) {
          return [...oldHistory, [operation]];
        } else {
          const mostRecentHistorySection = oldHistory[oldHistory.length - 1];
          if (mostRecentHistorySection === undefined) {
            return [[operation]];
          }
          return [...oldHistory.slice(0, -1), [...mostRecentHistorySection, operation]];
        }
      });
    },
    [lastOperationTime],
  );

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

  const add = useCallback(
    (token: Token, maybeCount?: number) => {
      const count = maybeCount ?? 1;
      if (totalItemCountRef.current + count > MaxTokenCount) {
        throw new BagError(`Bag can't contain more than ${MaxTokenCount} tokens`);
      }
      const tokenKey = tokenToKey(token);
      setItemsInternal((currentItems) => ({ ...currentItems, [tokenKey]: (currentItems[tokenKey] ?? 0) + count }));
      totalItemCountRef.current += count;

      recordHistory({ token, count: maybeCount, operationType: "add" });
    },
    [recordHistory],
  );

  const maybeDeleteToken = useCallback(
    (token: Token, maybeCount?: number) => {
      const count = maybeCount ?? 1;
      const tokenKey = tokenToKey(token);
      const currentCount = items[tokenKey] ?? 0;

      if (currentCount >= count) {
        setItemsInternal((currentItems) => ({ ...currentItems, [tokenKey]: (currentItems[tokenKey] ?? 0) - count }));
        totalItemCountRef.current -= count;

        recordHistory({ token, count: maybeCount, operationType: "remove" });
        return token;
      } else {
        return null;
      }
    },
    [items, recordHistory],
  );

  const setItems = useCallback((newItems: BagItems) => {
    const newItemsMap = bagItemsToMap(newItems);
    setItemsInternal(newItemsMap);
    totalItemCountRef.current = sumWeights(newItemsMap);
    setHistory([]);
    setLastOperationTime(0);
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
      operationHistory: history,
    }),
    [add, maybePick, pickOrThrow, setItems, maybeDeleteToken, items, history],
  );
};
