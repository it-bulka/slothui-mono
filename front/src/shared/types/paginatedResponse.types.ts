export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string | null; // cursor-based pagination
  hasMore: boolean;
}