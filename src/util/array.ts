const array = {
  nonNullable: <T>(o: T | null | undefined): o is T => (o != null ? true : false),
};

export default array;
