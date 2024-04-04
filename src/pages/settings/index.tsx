import React, { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { Divider } from 'antd';
import About from './About';
import Account from './Account';
import Gernal from './Gernal';
import Theme from './Theme';
import Navs from './Navs';
import styles from './style.less';

interface ISettings {}

const Settings: FC<ISettings> = () => {
  return (
    <div className={styles.setting}>
      <div className={styles.header}>
        <ArrowLeftOutlined onClick={history.back} className={styles.back} />{' '}
        设置
      </div>
      <Divider />
      <div className={styles.content}>
        <div></div>
        <div>
          <Account />
          <Divider orientation='left'>常规</Divider>
          <Gernal />
          <Divider orientation='left'>主题</Divider>
          <Theme />
          <Divider orientation='left'>智能列表</Divider>
          <Navs />
          <Divider orientation='left'>关于</Divider>
          <About />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Settings;
