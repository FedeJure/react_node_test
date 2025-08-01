import { useState, useEffect, useCallback, useMemo } from 'react';

const useTaskFilter = (tasks) => {
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });

  const filteredTasks = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) {
      setFilteredTasks([]);
      return;
    }

    let result = [...tasks];

    // to filter by task status
    if (filters.status === 'completed') {
      result = result.filter(task => task.progress === 100 || task.status === 'complete');
    } else if (filters.status === 'pending') {
      result = result.filter(task => task.progress < 100 && task.status !== 'complete');
    }

    // to filter by entered search text
    if (filters.search.trim().length > 0) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }
    return result
  }, [tasks, filters])

  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ status: 'all', search: '' });
  }, []);

  return {
    filteredTasks,
    filters,
    updateFilter,
    clearFilters
  };
};

export default useTaskFilter;
