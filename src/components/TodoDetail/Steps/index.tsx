import React, { FC } from 'react';
import { Radio, Input } from 'antd';
import { StarOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.module.less';
import { noop } from 'antd/es/_util/warning';

const { TextArea } = Input;

interface ISteps {
  title?: string;
  steps?: {
    text: string;
    status: number;
  }[];
}

const Steps: FC<ISteps> = ({
  title = '标题',
  steps = [
    {
      text: '11111111111',
      status: 1,
    },
  ],
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <span className={styles.left}>
          <Radio />
        </span>
        <span className={styles.center}>
          <TextArea
            autoSize={{
              minRows: 1,
              maxRows: 2,
            }}
            style={{
              border: 'none',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            value={title}
          />
        </span>
        <span className={styles.right}>
          <StarOutlined />
        </span>
      </div>
      {steps.map(item => (
        <div className={styles.list}>
          <span className={styles.left}>
            <Radio />
          </span>
          <span className={styles.center}>
            <TextArea
              autoSize={{
                minRows: 1,
                maxRows: 2,
              }}
              style={{
                border: 'none',
              }}
              value={item.text}
            />
          </span>
          <span className={styles.right}>
            <MoreOutlined />
          </span>
        </div>
      ))}

      <div className={styles.list}>
        <span className={styles.left}>
          <PlusOutlined />
        </span>
        <span className={styles.center}>
          <TextArea
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            style={{
              border: 'none',
            }}
            placeholder='请添加'
          />
        </span>
      </div>
    </div>
  );
};

export default Steps;
