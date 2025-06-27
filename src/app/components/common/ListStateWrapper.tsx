import React from 'react';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import NotFound from '../ui/NotFound';
import Table from '../Table';
import PaginationComponent from './PaginationComponent';
import { useTranslation } from 'react-i18next';
import type { ListStateWrapperProps } from '../../types';

const ListStateWrapper = <T extends Record<string, any>>({
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const hasData = data?.data && data.data.length > 0;

  if (!hasData) {
    return <NotFound message={t(emptyMessageKey)} />;
  }

  return (
    <>
      <Table<T> columns={columns} data={data.data} />
      <PaginationComponent
        count={totalPages}
        page={currentPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        limit={currentLimit}
        onLimitChange={setLimit}
      />
    </>
  );
};

export default ListStateWrapper;
