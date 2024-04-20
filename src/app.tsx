import React from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import { RuntimeConfig } from 'umi';
import { Provider } from 'react-redux';
import { store } from './store';

dayjs.locale('zh-cn');

export const rootContainer: RuntimeConfig['rootContainer'] = container => {
  return React.createElement(
    ConfigProvider,
    {
      locale: zhCN,
    },
    <Provider store={store}>{container}</Provider>
  );
};
