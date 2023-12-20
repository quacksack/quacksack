import { useCallback, useMemo, useRef, useState } from "react";
import { OperationHistory } from "./types";

// 10 seconds
const IntervalUntilNewOperationHistorySection = 10 * 1000;

export const useOperationHistory = <T,>() => {
  const lastOperationTimeRef = useRef<ReturnType<typeof Date.now>>(0);
  const [operationHistory, setOperationHistory] = useState<OperationHistory<T>>([]);

  // Record item add and remove events
  const recordOperationHistory = useCallback(
    (operation: T) => {
      const operationTime = Date.now();
      const oldLastOperationTime = lastOperationTimeRef.current;

      lastOperationTimeRef.current = operationTime;

      setOperationHistory((oldHistory) => {
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
    [lastOperationTimeRef],
  );

  const resetHistory = useCallback(() => {
    setOperationHistory([]);
    lastOperationTimeRef.current = 0;
  }, []);

  return useMemo(
    () => ({
      operationHistory,
      recordOperationHistory,
      resetHistory,
    }),
    [operationHistory, recordOperationHistory, resetHistory],
  );
};
