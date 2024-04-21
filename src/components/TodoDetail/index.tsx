import React, { FC, useCallback } from 'react';
import Footer from './Footer';
import Base from './Base';
import ToolBar from './ToolBar';
import styles from './style.module.less';
import { ITodo } from '@/type';
import { TodoActions } from '@/store/todo';
import { useAppDispatch, useAppSelector } from '@/hooks';
interface ITodoDetail {
  id: number;
}

const TodoDetail: FC<ITodoDetail> = ({ id }) => {
  const currentTodo = useAppSelector(state =>
    state.todoReducer.find(item => item.id === id)
  );

  const dispatch = useAppDispatch();

  const updateTodo = useCallback(
    ({ key, value }: { key: TKeyPath; value: any }) => {
      dispatch(
        TodoActions.updateTodoByKey({
          todoId: id,
          key,
          value,
        })
      );
    },
    [currentTodo]
  );

  return (
    currentTodo && (
      <div className={styles.detail}>
        <div className={styles.content}>
          <Base {...currentTodo} updateTodo={updateTodo} />
          <ToolBar />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    )
  );
};

export default TodoDetail;
