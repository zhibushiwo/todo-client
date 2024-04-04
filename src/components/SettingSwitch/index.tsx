import React, { FC } from 'react';
import { Switch, SwitchProps } from 'antd';
import styles from './style.less';
interface ISettingSwitch extends SwitchProps {
  title: string;
  value?: boolean;
}

const SeISettingSwitch: FC<ISettingSwitch> = ({ title, value, ...props }) => {
  return (
    <div className={styles.switch}>
      <div className={styles.title}>{title}</div>
      <div>
        <Switch value={value} {...props} />{' '}
        <span className={styles.text}>{value ? '开' : '关'}</span>
      </div>
    </div>
  );
};

export default SeISettingSwitch;
