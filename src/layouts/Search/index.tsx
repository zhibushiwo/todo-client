import React, { FC } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
interface ISearch {}

const Search: FC<ISearch> = () => {
  return <Input placeholder='搜索' addonAfter={<SearchOutlined />} />;
};

export default Search;
