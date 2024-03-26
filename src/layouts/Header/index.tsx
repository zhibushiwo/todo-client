import React, { FC } from 'react';
import styles from './style.less'
interface IHeader {}

const Header: FC<IHeader> = () => {
  return <div className={styles.title}>TO DO</div>;
};

export default Header;
