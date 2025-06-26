import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import "moment-duration-format";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  fetchSubmissions,
  switchSubmissionToPaper,
  switchStudentSubmissionToPending,
} from "../../data-layer/submissions";
import ListStateWrapper from "../../components/common/ListStateWrapper";
import SubmissionFilters from "../../components/SubmissionFilters";
import { formatDateTime, formatDurationDescriptive } from "../../utils";
import { SubmissionsQueryResult, Submission } from "../../types";
import i18n from "../../locales/i18n";
import StudentDetailsDialog from "../../components/StudentDetailsDialog";
import SnackbarComponent from "../../components/common/SnackbarComponent";

const TrackSubmission = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    studentId: "",
    status: "",
    sessionHealth: "",
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const switchToPaperMutation = useMutation({
    mutationFn: switchSubmissionToPaper,
    onSuccess: () => {
      setSnackbar(
        t(
          "submissions.switchToPaperSuccess",
          "Successfully switched to paper mode"
        )
      );
      queryClient.invalidateQueries({
        queryKey: ["submissions", id, filters, limit, page, i18n.language],
      });
    },
  });

  const switchToPendingMutation = useMutation({
    mutationFn: switchStudentSubmissionToPending,
    onSuccess: () => {
      setSnackbar(
        t(
          "submissions.switchToPendingSuccess",
          "Successfully switched to pending status"
        )
      );
      queryClient.invalidateQueries({
        queryKey: ["submissions", id, filters, limit, page, i18n.language],
      });
    },
  });

  useEffect(() => {
    setPage(1);
  }, [limit, filters]);

  const { data, isLoading, error } = useQuery<SubmissionsQueryResult>({
    queryKey: ["submissions", id, filters, limit, page, i18n.language],
    queryFn: () =>
      fetchSubmissions({
        assessmentId: id,
        ...filters,
        limit,
        page,
        lang: i18n.language,
      }),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2, 
  });

  const getIsPresent = (value: string) => {
    return value === "ABSENT" ? "No" : "Yes";
  };

  const getIsAssesmentStarted = (value: string) => {
    return [
      "PENDING",
      "MOVED_TO_PAPER",
      "IN_PROGRESS",
      "STUDENT_SUBMISSION",
      "TIMER_SUBMISSION",
    ].includes(value)
      ? "Yes"
      : "No";
  };

  const handleStudentClick = (row: Submission) => {
    setSelectedSubmission(row);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSubmission(null);
  };

  const columns = useMemo(
    () => [
      {
        Header: t("submissions.studentId"),
        accessor: "student.id",
        Cell: ({ row }: { row: Submission }) => (
          <Button
            variant="text"
            color="primary"
            onClick={() => handleStudentClick(row)}
            sx={{ textTransform: "none" }}
          >
            {row.student?.id}
          </Button>
        ),
      },
      { Header: t("submissions.studentName"), accessor: "student.fullName" },
      {
        Header: t("submissions.login"),
        accessor: "status_login",
        Cell: ({ row }: { row: Record<string, string> }) =>
          getIsPresent(row.status),
      },
      {
        Header: t("submissions.start"),
        accessor: "status_start",
        Cell: ({ row }: { row: Record<string, string> }) =>
          getIsAssesmentStarted(row.status),
      },
      {
        Header: t("submissions.questionsSync"),
        accessor: "questionsSync",
        Cell: ({ value }: { value: string }) => t(`${value}`, value),
      },
      {
        Header: t("submissions.timeElapsed"),
        accessor: "timeElapsed",
        Cell: ({ value }: { value: number }) =>
          formatDurationDescriptive(value, t),
      },
      {
        Header: t("submissions.status"),
        accessor: "status",
        Cell: ({ value }: { value: string }) => t(`status.${value}`, value),
      },
      {
        Header: t("submissions.startTime"),
        accessor: "startTime",
        Cell: ({ value }: { value: string }) => formatDateTime(value),
      },
      {
        Header: t("submissions.actions"),
        accessor: "id",
        Cell: ({ row }: { row: Record<string, string> }) => {
          const status = row.status;
          const id = row.id;
          const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
          const open = Boolean(anchorEl);
          const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleMenuClose = () => {
            setAnchorEl(null);
          };
          const handleSwitchToPaper = () => {
            switchToPaperMutation.mutate(id);
            handleMenuClose();
          };
          const handleSwitchToPending = () => {
            switchToPendingMutation.mutate(id);
            handleMenuClose();
          };
          const hasActions =
            status === "ABSENT" || status === "STUDENT_SUBMISSION";
          return (
            <>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                disabled={!hasActions}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                {hasActions ? (
                  [
                    status === "ABSENT" && (
                      <MenuItem
                        key="switch-to-paper"
                        onClick={handleSwitchToPaper}
                        disabled={switchToPaperMutation.status === "pending"}
                      >
                        {switchToPaperMutation.status === "pending"
                          ? t("common.loading")
                          : t("submissions.switchToPaper")}
                      </MenuItem>
                    ),
                    status === "STUDENT_SUBMISSION" && (
                      <MenuItem
                        key="switch-to-pending"
                        onClick={handleSwitchToPending}
                        disabled={switchToPendingMutation.status === "pending"}
                      >
                        {switchToPendingMutation.status === "pending"
                          ? t("common.loading")
                          : t("submissions.switchToPending")}
                      </MenuItem>
                    ),
                  ].filter(Boolean)
                ) : (
                  <MenuItem disabled>{t("dashboard.action")}</MenuItem>
                )}
              </Menu>
            </>
          );
        },
      },
    ],
    [
      t,
      filters,
      limit,
      page,
      i18n.language,
      queryClient,
      switchToPaperMutation,
      switchToPendingMutation,
    ]
  );

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const currentPage = data?.pagination?.page || 1;
  const currentLimit = data?.pagination?.limit || limit;
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Box>
      <Typography variant="h5" component="h5" fontWeight="bold" sx={{ mb: 1 }}>
        {t("submissions.title")}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t("submissions.description")}
      </Typography>
      <SubmissionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
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
        emptyMessageKey="submissions.noSubmissions"
      />
      <StudentDetailsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        submission={selectedSubmission}
      />
      <SnackbarComponent
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar || ""}
      />
    </Box>
  );
};

export default TrackSubmission;
