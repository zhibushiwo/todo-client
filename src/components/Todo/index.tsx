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
type TStep = {
  total: number;
  current: number;
};

export interface ITodo {
  content: string;
  finished?: boolean;
  stared?: boolean;
  todoType: string;
  hasAttachment?: boolean;
  hasRemark?: boolean;
  step?: TStep;
  remindData?: string;
  isRepeat?: boolean;
}

const Todo: FC<ITodo> = ({
  content,
  hasAttachment,
  todoType,
  stared,
  step,
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
          <div className={styles.text}>{content}</div>
          <div className={styles.detail}>
            <span>{todoType}</span>
            <span>{step && `第${step.current}步，共${step.total}步 ·`}</span>
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
