import React, { FC } from 'react';
import { PlusOutlined, FolderAddOutlined } from '@ant-design/icons';
import styles from './style.module.less';
import { useAppDispatch } from '@/hooks';
import { TodoListActions } from '@/store/todoList';
import { LIST_ENUM } from '@/constant/enum';
interface IBottomBar {}

const BottomBar: FC<IBottomBar> = () => {
  const dispatch = useAppDispatch();
  const handleAddList = () => {
    dispatch(TodoListActions.addData(LIST_ENUM.LIST));
  };
  const handleAddGroup = () => {
    dispatch(TodoListActions.addData(LIST_ENUM.GROUP));
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
