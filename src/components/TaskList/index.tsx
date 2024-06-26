import React, { FC, useCallback, useEffect, useRef, Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Blank from './Blank';
import TaskGroup from './Group';
import TaskList from './List';
import { IHandleSwitch } from './type';
import { ITodoGroup } from '@/type';
import { LIST_ENUM } from '@/constant/enum';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TodoListActions, TListOrGroup } from '@/store/todoList';
import { groupSelector } from '@/store/selector';
import styles from './style.module.less';
interface ITaskListWrap {}

const TaskListWrap: FC<ITaskListWrap> = () => {
  const dispatch = useAppDispatch();
  // const todoListLength = useRef(0);
  const todoLists = useAppSelector(state => state.todoListReducer) || [];
  // const allGroups = useAppSelector(groupSelector);
  const handleSwitch = useCallback<IHandleSwitch>((prev, next) => {
    dispatch(TodoListActions.switchData([prev, next]));
  }, []);

  // const handleUpdate = useCallback(
  //   (key: TKeyPath, value: any) => {
  //     dispatch(
  //       TodoListActions.updateDataByKey({
  //         key,
  //         value,
  //       })
  //     );
  //   },
  //   [dispatch]
  // );

  // const handleRename = useCallback((id: id, value: string, type: LIST_ENUM) => {
  //   dispatch(
  //     TodoListActions.renameData({
  //       value,
  //       type,
  //       id,
  //     })
  //   );
  // }, []);

  // const removeList = useCallback((gIndex: number, index?: number) => {
  //   dispatch(
  //     TodoListActions.removeList({
  //       gIndex,
  //       index,
  //     })
  //   );
  // }, []);

  // const removeGroup = useCallback((index: number) => {
  //   dispatch(TodoListActions.removeGroup(index));
  // }, []);

  // const addList = useCallback((index: number) => {
  //   dispatch(TodoListActions.addListByGroupIndex(index));
  // }, []);

  // useEffect(() => {
  //   if (todoListLength.current < todoLists.length) {
  //   }
  //   todoListLength.current = todoLists.length;
  // }, [todoLists.length]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles['todo-list-wrap']}>
        {todoLists.map((item, index) => {
          let comp = null;
          if (item.type === LIST_ENUM.LIST) {
            comp = (
              <TaskList
                id={item.id}
                key={item.title}
                gIndex={index}
                title={item.title}
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
              />
            );
          }
          return (
            <Fragment key={item.id}>
              {comp}
              <Blank
                index={index}
                handleSwitch={handleSwitch}
                key={'blank_' + index}
              />
            </Fragment>
          );
        })}
      </div>
    </DndProvider>
  );
};

export default TaskListWrap;
