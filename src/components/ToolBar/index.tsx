import React, { FC } from 'react';
import { history, useMatch } from 'umi';
import styles from './style.less';
interface IToolBar {
  selected?: Boolean;
  icon?: React.ReactNode;
  title: React.ReactNode;
  count?: number;
  isShare?: Boolean;
  to: string;
}

const ToolBar: FC<IToolBar> = ({ icon, title, count, isShare, to }) => {
  const handleClick = () => {
    history.push(to);
  };
  const selected = useMatch(to);
  return (
    <div
      className={`${styles.toolbar} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <span className={styles.icon}>{icon || null}</span>
      <span>{title}</span>
      <span>{count}</span>
    </div>
  );
};

export default ToolBar;
