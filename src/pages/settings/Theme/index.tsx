import React, { FC } from 'react';
import { Radio, Space } from 'antd';
interface ITheme {}

const Theme: FC<ITheme> = () => {
  return (
    <Radio.Group>
      <Space direction='vertical'>
        <Radio value={1}>浅色主题</Radio>
        <Radio value={2}>深色主题</Radio>
      </Space>
    </Radio.Group>
  );
};

export default Theme;
