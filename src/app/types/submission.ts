import type { SUBMISSION_STATUS, SESSION_HEALTH, ASSESSMENT_STATUS } from '../constants';

export type SubmissionStatus = keyof typeof SUBMISSION_STATUS;
export type SessionHealth = keyof typeof SESSION_HEALTH;
export type AssessmentStatus = keyof typeof ASSESSMENT_STATUS;

export interface Student {
  id: number;
  username: string;
  fullName: string;
  email: string;
  groupId: number;
  createdAt: string;
}

export interface SubmissionAssessment {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: AssessmentStatus;
  areaId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  area: {
    id: number;
    name: string;
  };
}

export interface Submission {
  id: number;
  studentId: number;
  assessmentId: number;
  loginTime: string;
  startTime: string;
  questionsSync: number;
  timeElapsed: number;
  status: SubmissionStatus;
  sessionHealth: SessionHealth;
  createdAt: string;
  updatedAt: string;
  student: Student;
  assessment: SubmissionAssessment;
  activities?: SubmissionActivity[];
}

export interface SubmissionActivity {
  id: number;
  type: string;
  timestamp: string;
  description: string;
}

export interface SubmissionFilters {
  studentId: string;
  status: string;
  areaId: string;
}

export interface SubmissionFiltersData {
  statuses: SubmissionStatus[];
  sessionHealths: SessionHealth[];
  assessments: Array<{
    id: number;
    name: string;
  }>;
  areas: Array<{
    id: number;
    name: string;
  }>;
  students: Array<{
    id: number;
    fullName: string;
  }>;
}

export interface SubmissionsQueryResult {
  data: Submission[];
  filters: SubmissionFiltersData;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 