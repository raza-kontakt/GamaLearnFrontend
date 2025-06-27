import { QUERY_STALE_TIME } from '../constants';

export const createQueryKey = (...parts: (string | number | object)[]): string[] => {
  return parts.map(part => 
    typeof part === 'object' ? JSON.stringify(part) : String(part)
  );
};

export const getStaleTime = (type: keyof typeof QUERY_STALE_TIME = 'MEDIUM'): number => {
  return QUERY_STALE_TIME[type];
};

export const createSubmissionsQueryKey = (
  id: string,
  filters: object,
  limit: number,
  page: number,
  language: string
): string[] => {
  return createQueryKey('submissions', id, filters, limit, page, language);
};

export const createAssessmentsQueryKey = (
  language: string,
  filters: object,
  limit: number,
  page: number
): string[] => {
  return createQueryKey('assessments', language, filters, limit, page);
}; 