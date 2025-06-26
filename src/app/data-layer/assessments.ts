import api from '../utils/axios';

interface AssessmentFilters {
  limit?: number;
  page?: number;
  [key: string]: string | number | undefined;
}

export const fetchAssessments = async (
  lang: string,
  filters: AssessmentFilters
) => {
  const paramsObj: Record<string, string> = {
    limit: filters.limit?.toString() || '10',
    page: filters.page?.toString() || '1',
    lang,
  };
  Object.entries(filters).forEach(([key, value]) => {
    if (value && key !== 'limit' && key !== 'page') {
      paramsObj[key] = String(value);
    }
  });
  const params = new URLSearchParams(paramsObj);
  const { data } = await api.get(`/assignments?${params.toString()}`);
  return data;
};

export const syncAssessment = async (id: string) => {
  await api.get(`/assignments/sync/${id}`);
};
