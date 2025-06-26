import api from '../utils/axios';

interface SubmissionFilters {
  limit?: number;
  page?: number;
  studentId?: string;
  status?: string;
  lang?: string;
  sessionHealth?: string;
  assessmentId?: string;
}

export const fetchSubmissions = async (filters: SubmissionFilters) => {
  const params = new URLSearchParams();
  if (filters.assessmentId) params.append('assessmentId', filters.assessmentId);
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.lang) params.append('lang', filters.lang.toString());
  if (filters.studentId) params.append('studentId', filters.studentId);
  if (filters.status) params.append('status', filters.status);
  if (filters.sessionHealth)
    params.append('sessionHealth', filters.sessionHealth);

  const { data } = await api.get(`/exam-submissions?${params.toString()}`);
  return data;
};

export const switchSubmissionToPaper = async (id: string) => {
  const { data } = await api.patch(`/exam-submissions/${id}/switch-to-paper`);
  return data;
};

export const switchStudentSubmissionToPending = async (id: string) => {
  const { data } = await api.patch(`/exam-submissions/${id}/switch-to-pending`);
  return data;
};
