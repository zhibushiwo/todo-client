import React, { FC } from 'react';
import { Switch } from 'antd';
import styles from './style.module.less'
interface INavItem {
  icon: React.ReactNode;
  name: string;
  code?: string;
  value?: string;
}

const NavItem: FC<INavItem> = ({ icon, name, code, value }) => {
  return (
    <div className={styles['nav-item']}>
      <div>
        <span className={styles.icon}>{icon}</span>
        <span>{name}</span>
      </div>
      <Switch />
    </div>
  );
};

export default NavItem;
