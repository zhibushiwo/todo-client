import React, { FC } from 'react';
import { Avatar, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './style.less';
interface IAccount {}

const Account: FC<IAccount> = () => {
  return (
    <div className={styles.account}>
      <div className={styles.left}>
        <Avatar size={80} icon={<UserOutlined />} className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.user}>culler raul</div>
          <div className={styles.email}>1111111@qq.com</div>
        </div>
      </div>
      <div className={styles.right}>
        <Space direction='vertical'>
          <Button>管理账户</Button>
          <Button type='primary' danger>
            注销
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Account;
