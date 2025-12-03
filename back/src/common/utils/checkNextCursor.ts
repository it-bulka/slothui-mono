export function checkNextCursor<
  T extends Record<string, any>,
  K extends keyof T,
>({
  items,
  cursorField,
  limit,
}: {
  items: T[]; // length = limit + 1
  cursorField?: K;
  limit: number;
}) {
  const hasMore = items.length > limit;
  const itemForCursor = items[limit];
  const nextCursor = hasMore && cursorField ? itemForCursor[cursorField] : null;
  const resultItems = items.slice(0, limit);

  return {
    hasMore,
    nextCursor,
    resultItems,
    itemForCursor,
  };
}
