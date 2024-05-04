import React, { FC } from 'react';
import { Radio, Dropdown } from 'antd';
import {
  StarOutlined,
  MoreOutlined,
  PlusOutlined,
  DeleteOutlined,
  BorderOutlined,
  CheckSquareFilled,
} from '@ant-design/icons';
import styles from './style.module.less';
import { TextArea } from '@/components/Input';
import { ITodo } from '@/type';
import { MAX_TODO_VALUE } from '@/constant/config';
import { uniqueId } from 'lodash-es';
import { TODO_STATUS_ENUM } from '@/constant/enum';
enum MENU_ACTION {
  DELETE = 'DELETE',
  FINISH = 'FINISH',
}

interface IBase extends ITodo {
  updateTodo: (param: { key: TKeyPath; value: any }) => void;
}

const Base: FC<IBase> = ({ updateTodo, ...todo }: IBase) => {
  const handleChangeTitle: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    updateTodo({
      key: ['title'],
      value: e.target.value,
    });
  };

  const handleEditStep = (value: string, stepIndex: number) => {
    updateTodo({
      key: ['steps', stepIndex, 'title'],
      value,
    });
  };

  const handleAddStep = (value: string) => {
    updateTodo({
      key: 'steps',
      value: [
        ...(todo.steps || []),
        {
          title: value,
          id: Number(uniqueId()),
          todoId: todo.id,
        },
      ],
    });
  };

  const handleDeleteStep = (index: number) => {
    updateTodo({
      key: 'steps',
      value: todo.steps?.filter((item, i) => i !== index),
    });
  };

  const switchTodoStatus = () => {
    updateTodo({
      key: ['status'],
      value:
        todo.status === TODO_STATUS_ENUM.COMPLETED
          ? TODO_STATUS_ENUM.NOT_STARTED
          : TODO_STATUS_ENUM.COMPLETED,
    });
  };

  const switchStepStatus = (index: number) => {
    updateTodo({
      key: ['steps', index, 'completed'],
      value: !todo.steps?.[index]?.completed,
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <span className={styles.left} onClick={switchTodoStatus}>
          {todo.status === TODO_STATUS_ENUM.COMPLETED ? (
            <CheckSquareFilled />
          ) : (
            <BorderOutlined />
          )}
        </span>
        <span className={styles.center}>
          <TextArea
            autoSize={{
              minRows: 1,
            }}
            maxLength={MAX_TODO_VALUE}
            className={`${styles.title} ${todo.status === TODO_STATUS_ENUM.COMPLETED && 'text-complete'}`}
            value={todo.title}
            onChange={handleChangeTitle}
          />
        </span>
        <span className={styles.right}>
          <StarOutlined />
        </span>
      </div>
      {(todo.steps || []).map((item, index) => (
        <div key={item.id} className={styles.list}>
          <span className={styles.left} onClick={() => switchStepStatus(index)}>
            {item.completed ? <CheckSquareFilled /> : <BorderOutlined />}
          </span>
          <span className={styles.center}>
            <TextArea
              autoSize={{
                minRows: 1,
              }}
              className={`${item.completed && 'text-complete'}`}
              maxLength={MAX_TODO_VALUE}
              value={item.title}
              onChange={e => {
                handleEditStep(e.target.value, index);
              }}
            />
          </span>
          <span className={styles.right}>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: MENU_ACTION.FINISH,
                    label: (
                      <span>{`标记为${item.completed ? '未' : '已'}完成`}</span>
                    ),
                  },
                  {
                    key: MENU_ACTION.DELETE,
                    label: (
                      <span className='color-red '>
                        <DeleteOutlined /> 删除步骤
                      </span>
                    ),
                  },
                ],
                onClick: ({ key }) => {
                  if (key === MENU_ACTION.DELETE) {
                    handleDeleteStep(index);
                  } else if (key === MENU_ACTION.FINISH) {
                    switchStepStatus(index);
                  }
                },
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </span>
        </div>
      ))}

      <div className={styles.list}>
        <span className={styles.left}>
          <PlusOutlined />
        </span>
        <span className={`${styles.center} ${styles.add}`}>
          <TextArea
            autoSize={{
              minRows: 1,
            }}
            placeholder='下一步'
            maxLength={MAX_TODO_VALUE}
            onEnter={handleAddStep}
          />
        </span>
      </div>
    </div>
  );
};

export default Base;
