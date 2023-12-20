export type OperationHistorySection<T> = ReadonlyArray<T>;
export type OperationHistory<T> = ReadonlyArray<OperationHistorySection<T>>;

export type OperationHistoryApi<T> = {
  operationHistory: OperationHistory<T>;
  recordOperationHistory: (operation: T) => void;
  resetHistory: () => void;
};
