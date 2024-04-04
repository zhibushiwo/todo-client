import React, { FC } from 'react';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {history } from 'umi'
import styles from './style.module.less';
import {
  UserOutlined,
  SettingOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
interface IAccount {}

const Account: FC<IAccount> = () => {
  const items: MenuProps['items'] = [
    {
      key: 'manage',
      label: (
        <>
          <UserSwitchOutlined /> 管理账户
        </>
      ),
    },
    {
      key: 'setting',
      label: (
        <>
          <SettingOutlined /> 设置
        </>
      ),
    },
    {
      key: 'sync',
      label: (
        <>
          <SyncOutlined /> 同步
        </>
      ),
    },
  ];
  const onClick: MenuProps['onClick'] = e => {
    console.log(e.key);
    switch (e.key) {
      case 'setting':
        history.push('/settings')
        break;
    }
  };
  return (
    <Dropdown menu={{ items, onClick }} placement='bottom'>
      <div className={styles.account}>
        <Avatar size={40} icon={<UserOutlined />} className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.user}>culler raul</div>
          <div className={styles.email}>1111111@qq.com</div>
        </div>
      </div>
    </Dropdown>
  );
};

export default Account;
