import React, { FC, useEffect, useState, useMemo } from 'react';
import styles from './style.module.less';
import { Dropdown } from 'antd';
import { useAppSelector } from '@/hooks';
import { todoTypeSelector } from '@/store/selector';
import { TaskIcon } from '@/components/Icons';
import { INIT_TODO_TYPE_TASK } from '@/constant/config';

interface ITodoType {
  todoType?: id;
  onTodoTypeChange?: ({ id, name }: { id: id; name: string }) => void;
}

interface IMenuItem {
  key: number;
  label: string;
}

const TodoType: FC<ITodoType> = ({
  todoType = INIT_TODO_TYPE_TASK.id,
  onTodoTypeChange,
}) => {
  const todoTypeList = useAppSelector(todoTypeSelector);

  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const selectData = useMemo(() => {
    return menuItems!.find(item => item?.key === todoType);
  }, [todoType, menuItems]);

  useEffect(() => {
    setMenuItems([
      {
        label: INIT_TODO_TYPE_TASK.name,
        key: INIT_TODO_TYPE_TASK.id,
      },
      ...todoTypeList.map(item => ({
        label: item.title,
        key: item.id,
      })),
    ]);
  }, [todoTypeList]);

  const handleChange = (key: string) => {
    onTodoTypeChange?.({
      id: Number(key),
      name: menuItems!.find(item => item.key === Number(key))?.label!,
    });
  };

  return (
    <Dropdown
      placement='top'
      menu={{
        items: menuItems,
        onClick: item => {
          handleChange(item.key);
        },
      }}
      overlayStyle={{
        minWidth: 200,
      }}
    >
      <div className={styles['todo-type']}>
        <span>
          <TaskIcon />
        </span>
        <span>{selectData?.label}</span>
      </div>
    </Dropdown>
  );
};

export default TodoType;
