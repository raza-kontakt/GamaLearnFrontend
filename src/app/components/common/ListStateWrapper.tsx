import React from 'react';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import NotFound from '../ui/NotFound';
import Table from '../Table';
import PaginationComponent from './PaginationComponent';
import { useTranslation } from 'react-i18next';

interface ListStateWrapperProps<T = any> {
  isLoading: boolean;
  error: Error | null | boolean;
  data: { data: T[] } | undefined;
  columns: any[];
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  currentLimit: number;
  setLimit: (limit: number) => void;
  emptyMessageKey: string;
}

const ListStateWrapper = <T = any>({
  isLoading,
  error,
  data,
  columns,
  totalPages,
  currentPage,
  setPage,
  currentLimit,
  setLimit,
  emptyMessageKey,
}: ListStateWrapperProps<T>) => {
  const { t } = useTranslation();

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (data?.data && data.data.length > 0) {
    return (
      <>
        <Table columns={columns} data={data.data} />
        <PaginationComponent
          count={totalPages}
          page={currentPage}
          onPageChange={(_, value) => setPage(value)}
          limit={currentLimit}
          onLimitChange={setLimit}
        />
      </>
    );
  }
  return <NotFound message={t(emptyMessageKey)} />;
};

export default ListStateWrapper;
