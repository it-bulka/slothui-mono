export function addUniqueIds(stateIds: string[], posts: { id: string }[]) {
  const idsSet = new Set(stateIds);
  for (const post of posts) {
    if (!idsSet.has(post.id)) {
      stateIds.push(post.id);
    }
  }
}