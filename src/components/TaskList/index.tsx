import React, { FC, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Blank from './Blank';
import TaskGroup from './Group';
import TaskList from './List';
import { IChangeFunc } from './type';
import { ITodoGroup } from '@/type';
import { useAppDispatch, useAppSelector } from '@/hooks';
import styles from './style.module.less';
interface ITaskListWrap {}

const TaskListWrap: FC<ITaskListWrap> = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(state => state.todoListReducer) || [];
  const changeFunc = useCallback<IChangeFunc>((prev, next) => {}, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles['todo-list-wrap']}>
        {todoLists.map((item, index) => {
          let comp = null;
          if (item.type === 'list') {
            comp = (
              <TaskList
                id={item.id}
                key={item.title}
                gIndex={index}
                title={item.title}
                changeFunc={changeFunc}
              />
            );
          } else {
            comp = (
              <TaskGroup
                key={item.id}
                id={item.id}
                title={item.title}
                index={index}
                todoList={(item as ITodoGroup).todoList || []}
                changeFunc={changeFunc}
              />
            );
          }
          return (
            <>
              {comp}
              <Blank
                index={index}
                changeFunc={changeFunc}
                key={'blank_' + index}
              />
            </>
          );
        })}
      </div>
    </DndProvider>
  );
};

export default TaskListWrap;
