import React, { FC } from 'react';
import Title from './Title';
import Tools from './Tools';
import styles from './style.less';
interface IPageHeader {}

const PageHeader: FC<IPageHeader> = () => {
  return (
    <div className={styles['page-head']}>
      <Title />
      <Tools />
    </div>
  );
};

export default PageHeader;
