import React, { FC } from 'react';
import NavItem from './NavItem';
import {
  StarOutlined,
  ProjectOutlined,
  UserOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
interface INavs {}

const Navs: FC<INavs> = () => {
  const list = [
    {
      name: '重要',
      icon: <StarOutlined />,
    },
    {
      name: '计划内',
      icon: <ProjectOutlined />,
    },
    {
      name: '已完成',
      icon: <CheckCircleOutlined />,
    },
    {
      name: '全部',
      icon: <AppstoreOutlined />,
    },
    {
      name: '已分配给我',
      icon: <UserOutlined />,
    },
  ];

  return (
    <>
      {list.map(item => (
        <NavItem {...item} />
      ))}
    </>
  );
};

export default Navs;
