export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string; // cursor-based pagination
  hasMore: boolean;
}
