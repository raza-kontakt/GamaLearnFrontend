import React from 'react';

export * from './assessment';
export * from './submission';
export * from './common';

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
  status: "NOT_STARTED" | "ON_GOING" | "FINISHED" | "CLOSED";
  areaId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  area: Area;
  course?: Course;
  studentCount?: number;
}

export interface Filters {
  statuses: Array<"NOT_STARTED" | "ON_GOING" | "FINISHED" | "CLOSED">;
  programs: Program[];
  areas: Area[];
  courses: Course[];
}

export interface AssessmentsQueryResult {
  data: Assessment[];
  filters: Filters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FiltersProps<T = any> {
  filters: T;
  options: {
    areas: Array<{ id: number; name: string }>;
    programs: Array<{ id: number; name: string }>;
    courses: Array<{ id: number; name: string }>;
    statuses: string[];
  };
  onChange: (name: string, value: string) => void;
}

export interface PaginationComponentProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

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
  status: "NOT_STARTED" | "ON_GOING" | "FINISHED" | "CLOSED";
  areaId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  area: Area;
}

export interface Submission {
  id: number;
  studentId: number;
  assessmentId: number;
  loginTime: string;
  startTime: string;
  questionsSync: number;
  timeElapsed: number;
  status:
    | "ABSENT"
    | "PENDING"
    | "MOVED_TO_PAPER"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "DENIED"
    | "STUDENT_SUBMISSION"
    | "TIMER_SUBMISSION";
  sessionHealth: "GOOD" | "POOR" | "DISCONNECTED";
  createdAt: string;
  updatedAt: string;
  student: Student;
  assessment: SubmissionAssessment;
  activities?: any[];
}

export interface SubmissionFiltersData {
  statuses: Array<
    | "ABSENT"
    | "PENDING"
    | "MOVED_TO_PAPER"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "DENIED"
    | "STUDENT_SUBMISSION"
    | "TIMER_SUBMISSION"
  >;
  sessionHealths: Array<"GOOD" | "POOR" | "DISCONNECTED">;
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

export interface TableColumn<T = any> {
  Header: string;
  accessor: string;
  Cell?: (props: { value: any; row: T }) => React.ReactNode;
}

export interface ListStateWrapperProps<T = any> {
  isLoading: boolean;
  error: Error | null | boolean;
  data: { data: T[] } | undefined;
  columns: TableColumn<T>[];
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  currentLimit: number;
  setLimit: (limit: number) => void;
  emptyMessageKey: string;
}
