import React, { FC } from 'react';
import PageSkeleton from '@/components/PageSkeleton';
import AddTodo from '@/components/AddTodo';
import { useAppSelector } from '@/hooks';
import { importantTodoSelector } from '@/store/selector';
import TodoList from '@/components/TodoList';
import { TODO_IMPORTANT_ENUM } from '@/constant/enum';

interface IImportant {}

const Important: FC<IImportant> = () => {
  const importantTodoList = useAppSelector(importantTodoSelector);

  return (
    <PageSkeleton>
      <PageSkeleton.PageHeader></PageSkeleton.PageHeader>
      <PageSkeleton.PageContent>
        <TodoList todos={importantTodoList} />
      </PageSkeleton.PageContent>
      <PageSkeleton.PageFooter>
        <AddTodo importance={TODO_IMPORTANT_ENUM.IMPORTANT} />
      </PageSkeleton.PageFooter>
    </PageSkeleton>
  );
};

export default Important;
