import React, { FC } from 'react';
import Footer from './Footer';
import Steps from './Steps';
import ToolBar from './ToolBar';
import styles from './style.module.less';
interface ITodoDetail {}

const TodoDetail: FC<ITodoDetail> = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.content}>
        <Steps />
        <ToolBar />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default TodoDetail;
