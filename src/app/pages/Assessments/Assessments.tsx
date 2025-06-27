import { useMemo, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Link } from '@mui/material';
import 'moment/locale/ar';

import Filters from '../../components/Filters';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import type { Assessment, AssessmentsQueryResult } from '../../types';
import { formatDateTime } from '../../utils/index';
import { fetchAssessments, syncAssessment } from '../../data-layer/assessments';
import ListStateWrapper from '../../components/common/ListStateWrapper';

const Assessments = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    area: '',
    program: '',
    course: '',
    status: '',
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [limit, filters]);

  const { data, isLoading, error } = useQuery<AssessmentsQueryResult>({
    queryKey: ['assessments', i18n.language, filters, limit, page],
    queryFn: () => fetchAssessments(i18n.language, { ...filters, limit, page }),
  });

  const mutation = useMutation({
    mutationFn: syncAssessment,
    onMutate: (id: string) => {
      setSyncingId(id);
    },
    onSuccess: () => {
      setSyncingId(null);
      setSnackbar(t('dashboard.syncSuccess', 'Sync successful!'));
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
    },
  });

  const columns = useMemo(
    () => [
      { Header: t('dashboard.area.name'), accessor: 'area.name' },
      {
        Header: t('dashboard.assessmentName'),
        accessor: 'name',
      },
      {
        Header: t('dashboard.startDate'),
        accessor: 'startDate',
        Cell: ({ value }: { value: Assessment['startDate'] }) =>
          formatDateTime(value),
      },
      {
        Header: t('dashboard.endDate'),
        accessor: 'endDate',
        Cell: ({ value }: { value: Assessment['endDate'] }) =>
          formatDateTime(value),
      },
      {
        Header: t('dashboard.status'),
        accessor: 'status',
        Cell: ({ value }) => t(`statusLabels.${value}`, value),
      },
      {
        Header: t('dashboard.studentCount'),
        accessor: 'monitor',
        Cell: ({ row }: { row: Partial<Assessment> }) => (
          <Link href={`/track-submission/${row.id}`}>
            <span style={{ marginRight: '4px' }}>🤵</span>{' '}
            {row.studentCount ?? 0}
          </Link>
        ),
      },
      {
        Header: t('dashboard.action', 'Action'),
        accessor: 'action',
        Cell: ({ row }: { value: any; row: Assessment }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => mutation.mutate(row.id.toString())}
            disabled={syncingId === row.id.toString()}
          >
            {t('dashboard.sync')}
          </Button>
        ),
      },
    ],
    [t, mutation, syncingId]
  );

  const currentPage = data?.pagination.page || 1;
  const currentLimit = data?.pagination.limit || limit;
  const totalPages = data?.pagination.totalPages || 1;

  const filterOptions = data?.filters || {
    areas: [],
    programs: [],
    courses: [],
    statuses: [],
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h5" component="h5" fontWeight="bold" sx={{ mb: 1 }}>
        {t('features.assessments.downloadedAssessments')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('features.assessments.downloadedAssessmentsDesc')}
      </Typography>
      <Filters
        filters={filters}
        options={filterOptions}
        onChange={handleFilterChange}
      />
      <ListStateWrapper
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
        currentLimit={currentLimit}
        setLimit={setLimit}
        emptyMessageKey={'dashboard.noAssessmentsDesc'}
      />
      <SnackbarComponent
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
      />
    </Box>
  );
};

export default Assessments;
