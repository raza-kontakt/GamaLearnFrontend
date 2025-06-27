import { STATUS_COLORS, HEALTH_COLORS, SUBMISSION_STATUS } from '../constants';
import type { SubmissionStatus, SessionHealth } from '../types';

export const getStatusColor = (status: SubmissionStatus): string => {
  return STATUS_COLORS[status] || 'default';
};

export const getSessionHealthColor = (health: SessionHealth): string => {
  return HEALTH_COLORS[health] || 'default';
};

export const isStudentPresent = (status: SubmissionStatus): boolean => {
  return status !== SUBMISSION_STATUS.ABSENT;
};

export const isAssessmentStarted = (status: SubmissionStatus): boolean => {
  const startedStatuses: SubmissionStatus[] = [
    SUBMISSION_STATUS.PENDING,
    SUBMISSION_STATUS.MOVED_TO_PAPER,
    SUBMISSION_STATUS.IN_PROGRESS,
    SUBMISSION_STATUS.STUDENT_SUBMISSION,
    SUBMISSION_STATUS.TIMER_SUBMISSION,
  ];
  return startedStatuses.includes(status);
};

export const canSwitchToPaper = (status: SubmissionStatus): boolean => {
  return status === SUBMISSION_STATUS.ABSENT;
};

export const canSwitchToPending = (status: SubmissionStatus): boolean => {
  return status === SUBMISSION_STATUS.STUDENT_SUBMISSION;
}; 