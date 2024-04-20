import React, { FC, useState } from 'react';
import {
  StarOutlined,
  FileOutlined,
  FileWordOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import TodoDetail from '@/components/TodoDetail';
import styles from './style.less';
import { ITodo } from '@/type';


const Todo: FC<ITodo> = ({
  title,
  hasAttachment,
  todoType,
  steps,
  hasRemark,
  remindData,
  isRepeat,
}) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const handleDetail = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setDetailVisible(true);
  };

  return (
    <>
      <div className={styles.todo} onClick={handleDetail}>
        <div className={styles.state}>
          <CheckCircleOutlined />
        </div>
        <div className={styles.content}>
          <div className={styles.text}>{title}</div>
          <div className={styles.detail}>
            <span>{todoType}</span>
            <span>{steps && `第${0}步，共${steps.length}步 ·`}</span>
            <span> {remindData}</span>
            <span>{isRepeat && <SyncOutlined />}</span>
            <span>{hasRemark && <FileWordOutlined />}</span>
            <span>{hasAttachment && <FileOutlined />}</span>
          </div>
        </div>
        <div className={styles.star}>
          <StarOutlined />
        </div>
      </div>
      <Drawer open={detailVisible} onClose={() => setDetailVisible(false)}>
        <TodoDetail />
      </Drawer>
    </>
  );
};

export default Todo;
