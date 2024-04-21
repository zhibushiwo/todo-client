import React, { FC, useState } from 'react';
import ToolBar from '@/components/ToolBar';

import {
  MyDayIcon,
  ImportantIcon,
  PlannedIcon,
  TaskIcon,
  AssignedToMeIcon,
} from '@/components/Icons';

interface INav {}

const Nav: FC<INav> = () => {
  const navList = [
    {
      title: '我的一天',
      icon: <MyDayIcon />,
      to: '/myDay',
    },

    {
      title: '重要',
      icon: <ImportantIcon />,
      to: '/important',
    },

    {
      title: '计划内',
      icon: <PlannedIcon />,
      to: '/planned',
    },

    {
      title: '已分配给我',
      icon: <AssignedToMeIcon />,
      to: '/assignedToMe',
    },

    {
      title: '任务',
      icon: <TaskIcon />,
      to: '/tasks',
    },
  ];

  return (
    <>
      {navList.map((props, index) => (
        <ToolBar key={index} {...props} />
      ))}
    </>
  );
};

export default Nav;
