import React, { FC, useState } from 'react';
import ToolBar from '@/components/ToolBar';
import {
  SunOutlined,
  StarOutlined,
  ProjectOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
interface INav {}

const Nav: FC<INav> = () => {
  const navList = [
    {
      title: '我的一天',
      icon: <SunOutlined />,
      to: '/myDay',
    },

    {
      title: '重要',
      icon: <StarOutlined />,
      to: '/important',
    },

    {
      title: '计划内',
      icon: <ProjectOutlined />,
      to: '/planned',
    },

    {
      title: '已分配给我',
      icon: <UserOutlined />,
      to: '/assignedToMe',
    },

    {
      title: '任务',
      icon: <HomeOutlined />,
      to: '/tasks',
    },
  ];

  return (
    <>
      {navList.map(props => (
        <ToolBar {...props} />
      ))}
    </>
  );
};

export default Nav;
