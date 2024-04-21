import React, { FC, useState } from 'react';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { DeadLineIcon, RepeatIcon, RemindIcon } from '@/components/Icons';
import Input from '@/components/Input';
import TodoType from './TodoType';
import styles from './style.less';
import { useAppDispatch } from '@/hooks';
import { TodoActions } from '@/store/todo';
import { uniqueId } from 'lodash-es';

interface IAddTodo {}

const AddTodo: FC<IAddTodo> = () => {
  const dispatch = useAppDispatch();

  const addData = (value: string) => {
    dispatch(
      TodoActions.addTodo({
        title: value,
        id: Number(uniqueId()),
        todoType: '任务',
      })
    );
  };

  return (
    <div className={styles.wrap}>
      <PlusOutlined />
      <Input className={styles.text} onEnter={addData} />
      <TodoType icon={<MenuOutlined />} text='任务' />
      <DeadLineIcon />
      <RemindIcon />
      <RepeatIcon />
    </div>
  );
};

export default AddTodo;
