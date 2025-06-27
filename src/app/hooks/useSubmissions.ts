import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  fetchSubmissions,
  switchSubmissionToPaper,
  switchStudentSubmissionToPending,
} from "../data-layer/submissions";
import { createSubmissionsQueryKey, getStaleTime } from "../utils/query";
import type { SubmissionsQueryResult, SubmissionFilters } from "../types";

interface UseSubmissionsOptions {
  assessmentId?: string;
  filters: SubmissionFilters;
  limit: number;
  page: number;
  onSwitchToPaperSuccess?: () => void;
  onSwitchToPendingSuccess?: () => void;
  onRefreshSuccess?: () => void;
}

export const useSubmissions = ({
  assessmentId,
  filters,
  limit,
  page,
  onSwitchToPaperSuccess,
  onSwitchToPendingSuccess,
  onRefreshSuccess,
}: UseSubmissionsOptions) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const queryKey = createSubmissionsQueryKey(
    assessmentId || "",
    filters,
    limit,
    page,
    i18n.language
  );

  const submissionsQuery = useQuery<SubmissionsQueryResult>({
    queryKey,
    queryFn: () =>
      fetchSubmissions({
        assessmentId,
        studentId: filters.studentId,
        status: filters.status,
        areaId: filters.areaId,
        limit,
        page,
        lang: i18n.language,
      }),
    enabled: !!assessmentId,
    refetchOnWindowFocus: false,
    staleTime: getStaleTime("SHORT"),
  });

  const switchToPaperMutation = useMutation({
    mutationFn: switchSubmissionToPaper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      onSwitchToPaperSuccess?.();
    },
  });

  const switchToPendingMutation = useMutation({
    mutationFn: switchStudentSubmissionToPending,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      onSwitchToPendingSuccess?.();
    },
  });

  const refreshSubmissions = () => {
    queryClient.invalidateQueries({ queryKey }).then(() => {
      onRefreshSuccess?.();
    });
  };

  return {
    ...submissionsQuery,
    switchToPaper: switchToPaperMutation.mutate,
    switchToPending: switchToPendingMutation.mutate,
    isSwitchingToPaper: switchToPaperMutation.isPending,
    isSwitchingToPending: switchToPendingMutation.isPending,
    refreshSubmissions,
  };
};
