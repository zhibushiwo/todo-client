import React, { FC } from 'react';
import { PlusOutlined, FolderAddOutlined } from '@ant-design/icons';
import styles from './style.less';
import { useAppDispatch } from '@/hooks';
import { TodoListActions } from '@/store/todoList';
import { uniqueId } from 'lodash-es';
interface IBottomBar {}

const BottomBar: FC<IBottomBar> = () => {
  const dispatch = useAppDispatch();
  const handleAddList = () => {
    dispatch(
      TodoListActions.addData({
        id: Number(uniqueId()),
        title: '2222222222',
        type: 'list',
      })
    );
  };
  const handleAddGroup = () => {
    dispatch(
      TodoListActions.addData({
        id: Number(uniqueId()),
        title: '11111111',
        type: 'group',
      })
    );
  };
  return (
    <div className={styles['bottom-bar']}>
      <div className={styles.left} onClick={handleAddList}>
        <PlusOutlined className={styles.icon} />
        <span>新建列表</span>
      </div>
      <div className={styles.right} onClick={handleAddGroup}>
        <FolderAddOutlined />
      </div>
    </div>
  );
};

export default BottomBar;
