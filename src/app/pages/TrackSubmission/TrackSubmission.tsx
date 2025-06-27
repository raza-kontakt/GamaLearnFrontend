import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useSubmissions } from '../../hooks/useSubmissions';
import { useFilters } from '../../hooks/useFilters';
import { usePagination } from '../../hooks/usePagination';
import ListStateWrapper from '../../components/common/ListStateWrapper';
import SubmissionFilters from '../../components/SubmissionFilters';
import SubmissionSummaryCard from '../../components/submission/SubmissionSummaryCard';
import SubmissionActionMenu from '../../components/submission/SubmissionActionMenu';
import StudentDetailsDialog from '../../components/StudentDetailsDialog';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import { formatDateTime, formatDurationDescriptive } from '../../utils';
import { isStudentPresent, isAssessmentStarted } from '../../utils/status';
import type { 
  Submission, 
  SubmissionFilters as SubmissionFiltersType,
  TableColumn
} from '../../types';
import type { StudentSearchResult } from '../../data-layer/submissions';

const INITIAL_FILTERS: SubmissionFiltersType = {
  studentId: '',
  status: '',
  areaId: '',
};

const TrackSubmission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  const { filters, updateFilter } = useFilters({
    initialFilters: INITIAL_FILTERS,
  });
  
  const { limit, page, setLimit, setPage } = usePagination();
  
  const [selectedStudent, setSelectedStudent] = useState<StudentSearchResult | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const {
    data,
    isLoading,
    error,
    switchToPaper,
    switchToPending,
    refreshSubmissions,
  } = useSubmissions({
    assessmentId: id,
    filters,
    limit,
    page,
    onSwitchToPaperSuccess: () => {
      setSnackbar(
        t('submissions.switchToPaperSuccess', 'Successfully switched to paper mode')
      );
    },
    onSwitchToPendingSuccess: () => {
      setSnackbar(
        t('submissions.switchToPendingSuccess', 'Successfully switched to pending status')
      );
    },
    onRefreshSuccess: () => {
      setSnackbar(
        t('submissions.refreshSuccess', 'Successfully refreshed')
      );
    },
  });

  useEffect(() => {
    setPage(1);
  }, [limit, filters, setPage]);

  const handleStudentClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSubmission(null);
  };

  const handleFilterChange = (name: string, value: string) => {
    updateFilter(name as keyof SubmissionFiltersType, value);
  };

  const handleStudentChange = (student: StudentSearchResult | null) => {
    setSelectedStudent(student);
    updateFilter('studentId', student?.id.toString() || '');
  };

  const handleSnackbarClose = () => {
    setSnackbar(null);
  };

  const assessmentInfo = data?.data?.[0]?.assessment;

  const columns: TableColumn<Submission>[] = useMemo(
    () => [
      {
        Header: t('submissions.studentId'),
        accessor: 'student.id',
        Cell: ({ row }) => (
          <Button
            variant="text"
            color="primary"
            onClick={() => handleStudentClick(row)}
            sx={{ textTransform: 'none' }}
          >
            {row.student?.id}
          </Button>
        ),
      },
      { 
        Header: t('submissions.studentName'), 
        accessor: 'student.fullName' 
      },
      {
        Header: t('submissions.login'),
        accessor: 'status',
        Cell: ({ row }) => (isStudentPresent(row.status) ? 'Yes' : 'No'),
      },
      {
        Header: t('submissions.start'),
        accessor: 'status',
        Cell: ({ row }) => (isAssessmentStarted(row.status) ? 'Yes' : 'No'),
      },
      {
        Header: t('submissions.questionsSync'),
        accessor: 'questionsSync',
        Cell: ({ value }) => String(value),
      },
      {
        Header: t('submissions.timeElapsed'),
        accessor: 'timeElapsed',
        Cell: ({ value }) => formatDurationDescriptive(value, t),
      },
      {
        Header: t('submissions.status'),
        accessor: 'status',
        Cell: ({ value }) => t(`status.${value}`, String(value)),
      },
      {
        Header: t('submissions.startTime'),
        accessor: 'startTime',
        Cell: ({ value }) => formatDateTime(value),
      },
      {
        Header: t('submissions.actions'),
        accessor: 'id',
        Cell: ({ row }) => (
          <SubmissionActionMenu
            submissionId={row.id.toString()}
            status={row.status}
            onSwitchToPaper={switchToPaper}
            onSwitchToPending={switchToPending}
          />
        ),
      },
    ],
    [t, switchToPaper, switchToPending]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          {t('submissions.title')}
        </Typography>
        <Tooltip title={t('common.refresh')}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refreshSubmissions}
            size="small"
          >
            {t('common.refresh')}
          </Button>
        </Tooltip>
      </Box>

      {assessmentInfo && (
        <SubmissionSummaryCard
          assessmentName={assessmentInfo.name}
          startTime={assessmentInfo.startDate}
          totalStudents={data?.pagination?.total || 0}
          area={assessmentInfo.area.name}
        />
      )}

      <SubmissionFilters
        assessmentId={id || ''}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={data?.filters}
        selectedStudent={selectedStudent}
        onStudentChange={handleStudentChange}
      />

      <ListStateWrapper<Submission>
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        totalPages={data?.pagination?.totalPages || 0}
        currentPage={page}
        setPage={setPage}
        currentLimit={limit}
        setLimit={setLimit}
        emptyMessageKey="submissions.noSubmissions"
      />

      <StudentDetailsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        submission={selectedSubmission}
      />

      <SnackbarComponent
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar}
      />
    </Box>
  );
};

export default TrackSubmission;
