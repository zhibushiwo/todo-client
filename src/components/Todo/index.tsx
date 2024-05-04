import React, { FC, useState, useMemo } from 'react';
import {
  StarOutlined,
  FileOutlined,
  FileWordOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareFilled,
  BorderOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import TodoDetail from '@/components/TodoDetail';
import styles from './style.less';
import { ITodo } from '@/type';
import { isEmpty } from 'lodash-es';
import { TodoActions } from '@/store/todo';
import { useAppDispatch } from '@/hooks';
import { TODO_STATUS_ENUM } from '@/constant/enum';

const Todo: FC<ITodo> = todo => {
  const {
    title,
    hasAttachment,
    todoType,
    steps = [],
    remark,
    remindData,
    isRepeat,
    id,
    status,
  } = todo;
  const dispatch = useAppDispatch();
  const [detailVisible, setDetailVisible] = useState(false);
  const completeStepsCount = useMemo(() => {
    return steps.filter(item => item.completed).length;
  }, [steps]);

  const switchTodoStatus = () => {
    dispatch(
      TodoActions.updateTodoByKey({
        todoId: id,
        key: 'status',
        value:
          status === TODO_STATUS_ENUM.COMPLETED
            ? TODO_STATUS_ENUM.NOT_STARTED
            : TODO_STATUS_ENUM.COMPLETED,
      })
    );
  };

  return (
    <>
      <div
        className={styles.todo}
        onClick={e => {
          e.stopPropagation();
          setDetailVisible(true);
        }}
      >
        <div
          className={styles.state}
          onClick={e => {
            e.stopPropagation();
            switchTodoStatus();
          }}
        >
          {status === TODO_STATUS_ENUM.COMPLETED ? (
            <CheckSquareFilled />
          ) : (
            <BorderOutlined />
          )}
        </div>
        <div className={styles.content}>
          <div
            className={`${styles.text} ${status === TODO_STATUS_ENUM.COMPLETED && 'text-complete'}`}
          >
            {title}
          </div>
          <div className={styles.detail}>
            <span>{todoType}</span>
            <span>
              {!isEmpty(steps) && (
                <>
                  {completeStepsCount === steps.length && <CheckOutlined />}
                  {` 第${completeStepsCount}步，共${steps.length}步 `}
                </>
              )}
            </span>
            <span> {remindData}</span>
            <span>{isRepeat && <SyncOutlined />}</span>
            <span>{!!remark && <FileWordOutlined />}</span>
            <span>{hasAttachment && <FileOutlined />}</span>
          </div>
        </div>
        <div className={styles.star}>
          <StarOutlined />
        </div>
      </div>
      <Drawer open={detailVisible} onClose={() => setDetailVisible(false)}>
        <TodoDetail {...todo} />
      </Drawer>
    </>
  );
};

export default Todo;
