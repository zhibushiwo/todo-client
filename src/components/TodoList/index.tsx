import React, { FC, useState } from 'react';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Todo from '../Todo';
import { ITodo } from '@/type';
import styles from './style.less';
interface ITodoList {
  type: string;
  todos: ITodo[];
}

const TodoList: FC<ITodoList> = ({ type, todos }) => {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(data => !data);
  };
  return (
    <div>
      <div className={styles.title} onClick={handleClick}>
        <span>{toggle ? <ArrowDownOutlined /> : <ArrowRightOutlined />}</span>
        <span>{type}</span>
        <span>{todos.length}</span>
      </div>
      {toggle &&
        todos.map(item => {
          return (
            <div className={styles.todos}>
              <Todo {...item} />
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
