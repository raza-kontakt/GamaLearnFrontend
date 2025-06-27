import api from '../utils/axios';

interface SubmissionFilters {
  limit?: number;
  page?: number;
  studentId?: string;
  status?: string;
  lang?: string;
  sessionHealth?: string;
  assessmentId?: string;
  areaId?: string;
}

export interface StudentSearchResult {
  id: number;
  fullName: string;
  username: string;
  email: string;
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
  if (filters.areaId) params.append('areaId', filters.areaId);

  const { data } = await api.get(`/exam-submissions?${params.toString()}`);
  return data;
};

export const searchStudents = async ({
  assessmentId,
  searchTerm,
  limit = 10,
  lang = 'en'
}: {
  assessmentId: string;
  searchTerm: string;
  limit?: number;
  lang?: string;
}): Promise<StudentSearchResult[]> => {
  if (!searchTerm.trim()) {
    return [];
  }
  
  const params = new URLSearchParams();
  params.append('searchTerm', searchTerm.trim());
  params.append('limit', limit.toString());
  params.append('lang', lang);

  const { data } = await api.get(`exam-submissions/search-students/${assessmentId}?${params.toString()}`);
  return data.students || [];
};

export const switchSubmissionToPaper = async (id: string) => {
  const { data } = await api.patch(`/exam-submissions/${id}/switch-to-paper`);
  return data;
};

export const switchStudentSubmissionToPending = async (id: string) => {
  const { data } = await api.patch(`/exam-submissions/${id}/switch-to-pending`);
  return data;
};
