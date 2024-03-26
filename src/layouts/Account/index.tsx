import React, { FC } from 'react';
import { Avatar } from 'antd';
import styles from './style.less';
import { UserOutlined } from '@ant-design/icons';
interface IAccount {}

const Account: FC<IAccount> = () => {
  return (
    <div className={styles.account}>
      <Avatar size={40} icon={<UserOutlined />} className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.user}>culler raul</div>
        <div className={styles.email}>1111111@qq.com</div>
      </div>
    </div>
  );
};

export default Account;
