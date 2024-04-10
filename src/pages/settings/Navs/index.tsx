import React, { FC } from 'react';
import NavItem from './NavItem';
import {
  TotalIcon,
  ImportantIcon,
  PlannedIcon,
  FinishiedIcon,
  AssignedToMeIcon
} from '@/components/Icons'
interface INavs {}

const Navs: FC<INavs> = () => {
  const list = [
    {
      name: '重要',
      icon: <ImportantIcon />,
    },
    {
      name: '计划内',
      icon: <PlannedIcon />,
    },
    {
      name: '已完成',
      icon: <FinishiedIcon />,
    },
    {
      name: '全部',
      icon: <TotalIcon />,
    },
    {
      name: '已分配给我',
      icon: <AssignedToMeIcon />,
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
