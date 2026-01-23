export function addUniqueIds(stateIds: string[], posts: { id: string }[]) {
  const idsSet = new Set(stateIds);
  const newIds: string[] = [];

  for (const post of posts) {
    if (!idsSet.has(post.id)) {
      newIds.push(post.id);
      idsSet.add(post.id);
    }
  }

  return [...stateIds, ...newIds];
}