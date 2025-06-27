import type { AssessmentStatus } from './submission';

export interface Area {
  id: number;
  name: string;
  createdAt: string;
}

export interface Program {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  programId?: number;
  program?: Program;
}

export interface Assessment {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: AssessmentStatus;
  areaId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  area: Area;
  course?: Course;
  studentCount?: number;
}

export interface AssessmentFilters {
  area: string;
  program: string;
  course: string;
  status: string;
}

export interface AssessmentFilterOptions {
  areas: Area[];
  programs: Program[];
  courses: Course[];
  statuses: string[];
}

export interface AssessmentsQueryResult {
  data: Assessment[];
  filters: {
    statuses: AssessmentStatus[];
    programs: Program[];
    areas: Area[];
    courses: Course[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 