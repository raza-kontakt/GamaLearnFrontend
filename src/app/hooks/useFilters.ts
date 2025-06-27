import { useState, useCallback } from 'react';

interface UseFiltersOptions<T> {
  initialFilters: T;
  onFilterChange?: (filters: T) => void;
}

export const useFilters = <T extends Record<string, any>>({
  initialFilters,
  onFilterChange,
}: UseFiltersOptions<T>) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilter = useCallback((name: keyof T, value: any) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  }, [filters, onFilterChange]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  }, [initialFilters, onFilterChange]);

  const setAllFilters = useCallback((newFilters: T) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  }, [onFilterChange]);

  return {
    filters,
    updateFilter,
    resetFilters,
    setAllFilters,
  };
}; 