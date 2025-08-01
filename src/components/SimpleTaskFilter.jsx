import React, { useCallback } from 'react';

const SimpleTaskFilter = ({ filters, onFilterChange, taskCount, filteredCount }) => {
  const handleClearFilters = useCallback(() => {
    onFilterChange('search', '');
    onFilterChange('status', 'all');
  }, [onFilterChange]);

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 w-full" role="search">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search-input" className="sr-only">
            Search tasks
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search tasks..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <label htmlFor="status-select" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-select"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      {(filteredCount !== taskCount || filters.search || filters.status !== 'all') && (
        <div className="mt-3 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Showing {filteredCount} of {taskCount} tasks
          </span>
          {(filters.search || filters.status !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-800 underline"
              type="button"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleTaskFilter;
