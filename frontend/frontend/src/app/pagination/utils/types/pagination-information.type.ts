/**
 * Pagination information
 */
export interface PaginationInformation {
  /**
   * Current page
   * @type { number }
   */
  currentPage: number;
  /**
   * Last page
   * @type { number }
   */
  lastPage: number;
  /**
   * Per page
   * @type { number }
   */
  perPage: number;
  /**
   * Total
   * @type { number }
   */
  total: number;
}
