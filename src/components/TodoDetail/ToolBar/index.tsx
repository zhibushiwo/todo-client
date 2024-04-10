import React, { FC } from 'react';
import { Input } from 'antd';
import {
  MyDayIcon,
  RemindIcon,
  RepeatIcon,
  DeadLineIcon,
  FileIcon,
} from '@/components/Icons';
const { TextArea } = Input;
import styles from './style.module.less';
interface IToolBar {}

const ToolBar: FC<IToolBar> = () => {
  return (
    <>
      <div className={`${styles.list} ${styles.wrap}`}>
        <span className={styles.left}>
          <MyDayIcon />
        </span>
        <span className={styles.content}>添加到“我的一天”</span>
      </div>
      <div className={styles.wrap}>
        <div className={styles.list}>
          <span className={styles.left}>
            <RemindIcon />
          </span>
          <span className={styles.content}>提醒我</span>
        </div>
        <div className={styles.list}>
          <span className={styles.left}>
            <DeadLineIcon />
          </span>
          <span className={styles.content}>添加截止日期</span>
        </div>
        <div className={styles.list}>
          <span className={styles.left}>
            <RepeatIcon />
          </span>
          <span className={styles.content}>重复</span>
        </div>
      </div>
      <div className={`${styles.list} ${styles.wrap}`}>
        <span className={styles.left}>
          <FileIcon />
        </span>
        <span className={styles.content}>添加文件</span>
      </div>
      <div className={styles.wrap}>
        <TextArea
          placeholder='添加备注'
          style={{
            border: 'none',
          }}
        />
      </div>
    </>
  );
};

export default ToolBar;
