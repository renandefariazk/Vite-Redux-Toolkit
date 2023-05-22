export interface SortingParams {
  orderBy?: string;
  orderByDirection?: 'asc' | 'desc';
  dirty?: boolean;
}

/** for filtering on listing pages */
export interface FindMany extends SortingParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  readonly total: number;
  readonly per_page: number;
  readonly current_page: number;
  readonly last_page: number;
  readonly first_page: number;
  readonly first_page_url: string;
  readonly last_page_url: string;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
}

export interface PaginationParams {
  [prop: string]: FindMany;
}