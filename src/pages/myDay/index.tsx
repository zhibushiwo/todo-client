import React, { FC, useEffect } from 'react';
import PageHeader from './PageHeader';
import AddTodo from '@/components/AddTodo';
import Todo from '@/components/Todo';
import TodoList from '@/components/TodoList';
import styles from './style.less';
import { initTodoListData } from '@/store/todoList';
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
    <div className={styles.wrap}>
      <PageHeader />
      <div className={styles.todos}>
        {data.map((item, index) => (
          <Todo key={index} {...item} />
        ))}
      </div>
      <div className={styles.add}>
        <AddTodo />
      </div>
    </div>
  );
};

export default MyDay;
