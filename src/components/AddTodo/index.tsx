import React, { FC, useState } from 'react';
import { Input } from 'antd';
import {
  PlusOutlined,
  MenuOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import TodoType from './TodoType';
import styles from './style.less';
interface IAddTodo {}

const AddTodo: FC<IAddTodo> = () => {
  const [text, setText] = useState('');
  return (
    <div className={styles.wrap}>
      <PlusOutlined />
      <Input className={styles.text} />
      <TodoType icon={<MenuOutlined />} text='任务' />
      <CalendarOutlined />
      <ClockCircleOutlined />
      <RetweetOutlined />
    </div>
  );
};

export default AddTodo;
