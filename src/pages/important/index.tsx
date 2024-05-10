import React, { FC } from 'react';
import PageSkeleton from '@/components/PageSkeleton';
import AddTodo from '@/components/AddTodo';

interface IImportant {}

const Important: FC<IImportant> = () => {
  return (
    <PageSkeleton>
      <PageSkeleton.PageHeader></PageSkeleton.PageHeader>
      <PageSkeleton.PageContent></PageSkeleton.PageContent>
      <PageSkeleton.PageFooter>
        <AddTodo />
      </PageSkeleton.PageFooter>
    </PageSkeleton>
  );
};

export default Important;
