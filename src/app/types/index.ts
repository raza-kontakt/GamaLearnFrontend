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
  course: Course;
  studentCount: number;
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

export interface FiltersProps {
  filters: any;
  options: {
    areas: Area[];
    programs: Program[];
    courses: Course[];
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

export interface Submission {
  id: number;
  studentId: number;
  assessmentId: number;
  loginTime: string;
  startTime: string;
  questionsSync: number;
  timeElapsed: number;
  status:
    | "IN_PROGRESS"
    | "COMPLETED"
    | "PENDING"
    | "STUDENT_SUBMISSION"
    | "ABSENT"
    | "DISCONNECTED";
  sessionHealth: "GOOD" | "AVERAGE" | "POOR";
  createdAt: string;
  updatedAt: string;
  student: Student;
  assessment: Assessment;
  score?: number;
}

export interface SubmissionsQueryResult {
  data: Submission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
