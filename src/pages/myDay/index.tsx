import React, { FC } from 'react';
import PageHeader from './PageHeader';
import AddTodo from '@/components/AddTodo';
import Todo from '@/components/Todo';
import TodoList from '@/components/TodoList';
import styles from './style.less';
interface IMyDay {}

const MyDay: FC<IMyDay> = () => {
  const list = [
    {
      type: '先前',
      todos: [
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
      ],
    },
    {
      type: '明天',
      todos: [
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
        {
          content: '1111111111111111111',
          todoType: '任务',
        },
      ],
    },
  ];

  return (
    <div className={styles.wrap}>
      <PageHeader />
      <div className={styles.todos}>
        {/* <div>
          <Todo
            content='11111111111111111111111111 11111111111111111111111111  11111111111111111111111111 11111111111111111111111111  11111111111111111111111111  11111111111111111111111111 1111111111111111111111111111111111111111111111111111'
            todoType='任务'
          />
        </div>
        <div>
          <Todo content='11111111111111111111111111' todoType='任务' />
        </div>
        <div>
          <Todo
            stared
            step={{ total: 4, current: 1 }}
            hasAttachment
            hasRemark
            isRepeat
            content='11111111111111111111111111'
            todoType='任务'
          />
        </div> */}
        {list.map(item => (
          <TodoList {...item} />
        ))}
      </div>
      <div className={styles.add}>
        <AddTodo />
      </div>
    </div>
  );
};

export default MyDay;
