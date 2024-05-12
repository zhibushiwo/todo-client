import React, { FC, useEffect } from 'react';
import AddTodo from '@/components/AddTodo';
import Todo from '@/components/Todo';
import styles from './style.less';
import { initTodoListData } from '@/store/todoList';
import PageSkeleton from '@/components/PageSkeleton';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks';
interface IMyDay {}

const MyDay: FC<IMyDay> = () => {
  const data = useAppSelector(state => state.todoReducer);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initTodoListData([]));
  }, []);
  return (
    <PageSkeleton>
      <PageSkeleton.PageHeader />
      <PageSkeleton.PageContent></PageSkeleton.PageContent>
      <PageSkeleton.PageFooter>
        <AddTodo />
      </PageSkeleton.PageFooter>
    </PageSkeleton>
  );
};

export default MyDay;
