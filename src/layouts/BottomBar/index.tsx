import React, { FC } from 'react';
import { PlusOutlined, FolderAddOutlined } from '@ant-design/icons';
import styles from './style.less';
interface IBottomBar {}

const BottomBar: FC<IBottomBar> = () => {
  return (
    <div className={styles['bottom-bar']}>
      <div className={styles.left}>
        <PlusOutlined className={styles.icon} />
        <span>新建列表</span>
      </div>
      <div className={styles.right}>
        <FolderAddOutlined />
      </div>
    </div>
  );
};

export default BottomBar;
