import React from 'react';
import './DataTable.css';

export interface Column<T = any> {
  key: string;
  header: string;
  render?: (item: any, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: string;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T | string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  loading?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  compact?: boolean;
  rowActions?: (item: T, index: number) => React.ReactNode;
  noHover?: boolean;
  className?: string;
}

export function DataTable<T = any>({
  columns,
  data,
  keyField,
  onRowClick,
  emptyMessage = 'No data available',
  loading = false,
  pageSize,
  currentPage = 1,
  totalItems,
  onPageChange,
  compact = false,
  rowActions,
  noHover = false,
  className = '',
}: DataTableProps<T>) {
  const renderCell = (item: any, column: Column<any>, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }
    const value = (item as Record<string, unknown>)[column.key];
    return value !== undefined && value !== null ? String(value) : '-';
  };

  const renderRow = (item: any, index: number) => {
    const rowKey = String((item as Record<string, unknown>)[keyField as string] ?? index);
    return (
      <tr
        key={rowKey}
        className={`data-table-row ${onRowClick ? 'clickable' : ''} ${
          noHover ? 'no-hover' : ''
        } ${compact ? 'compact' : ''}`}
        onClick={() => onRowClick?.(item)}
        role={onRowClick ? 'button' : undefined}
        tabIndex={onRowClick ? 0 : undefined}
        onKeyDown={
          onRowClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick(item);
                }
              }
            : undefined
        }
      >
        {columns.map((col) => (
          <td
            key={col.key}
            style={{
              width: col.width,
                          textAlign: (col.align as any) || 'left',
            }}
          >
            {renderCell(item, col, index)}
          </td>
        ))}
        {rowActions && (
          <td className="data-table-actions">
            {rowActions(item, index)}
          </td>
        )}
      </tr>
    );
  };

  const totalPages = totalItems ? Math.ceil(totalItems / (pageSize || 10)) : 1;
  const hasPagination = pageSize && totalItems !== undefined;

  return (
    <div className={`data-table-wrapper ${className}`}>
      {loading ? (
        <div className="data-table-loading">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="data-table-loading-row">
              {[...Array(columns.length + (rowActions ? 1 : 0))].map((_, j) => (
                <div key={j} className="data-table-loading-cell skeleton" />
              ))}
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="data-table-empty">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="data-table-container">
          <table className={`data-table ${compact ? 'compact' : ''}`}>
            <thead>
              <tr className="data-table-header-row">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      width: col.width,
                      textAlign: (col.align as any) || 'left',
                    }}
                    className={col.sortable ? 'sortable' : ''}
                  >
                    {col.header}
                    {col.sortable && (
                      <svg
                        className="sort-icon"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 5h10M11 9h10M11 13h10M11 17h10" />
                      </svg>
                    )}
                  </th>
                ))}
                {rowActions && <th className="data-table-actions-header"></th>}
              </tr>
            </thead>
            <tbody>{data.map(renderRow)}</tbody>
          </table>
        </div>
      )}

      {hasPagination && (
        <div className="data-table-pagination">
          <div className="data-table-pagination-info">
            Showing {(currentPage - 1) * (pageSize || 10) + 1} to{' '}
            {Math.min(currentPage * (pageSize || 10), totalItems || 0)} of{' '}
            {totalItems ?? 0} results
          </div>
          <div className="data-table-pagination-controls">
            <button
              className="btn btn-ghost btn-sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              aria-label="Previous page"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <span className="data-table-pagination-page">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              aria-label="Next page"
            >
              Next
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
