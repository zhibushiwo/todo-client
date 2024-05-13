import React, { FC, useState } from 'react';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { DeadLineIcon, RepeatIcon, RemindIcon } from '@/components/Icons';
import Input from '@/components/Input';
import TodoType from '@/components/TodoType';
import styles from './style.less';
import { useAppDispatch } from '@/hooks';
import { TodoActions } from '@/store/todo';
import DeadLine from '@/components/DeadLine';
import { INIT_TODO_TYPE_TASK } from '@/constant/config';
import { TODO_IMPORTANT_ENUM } from '@/constant/enum';
import { isNil } from 'lodash-es';

import { uniqueId } from 'lodash-es';

interface IAddTodo {
  importance?: number;
  todoType?: id;
  todoTypeName?: string;
}

const AddTodo: FC<IAddTodo> = ({
  importance = TODO_IMPORTANT_ENUM.UNIMPORTANT,
  todoType: propsTodoType,
  todoTypeName,
}) => {
  const dispatch = useAppDispatch();
  const [todoType, setTodoType] = useState(
    isNil(propsTodoType)
      ? INIT_TODO_TYPE_TASK
      : {
          id: propsTodoType,
          name: todoTypeName,
        }
  );
  const addData = (value: string) => {
    dispatch(
      TodoActions.addTodo({
        title: value,
        id: Number(uniqueId()),
        todoType: todoType.id,
        todoTypeName: todoType.name,
        importance,
      })
    );
  };

  return (
    <div className={styles.wrap}>
      <PlusOutlined />
      <Input className={styles.text} onEnter={addData} />
      {isNil(propsTodoType) && (
        <TodoType todoType={todoType.id} onTodoTypeChange={setTodoType} />
      )}
      <DeadLine>
        <DeadLineIcon />
      </DeadLine>
      <RemindIcon />
      <RepeatIcon />
    </div>
  );
};

export default AddTodo;
