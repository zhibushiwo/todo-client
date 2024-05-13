import React, {
  FC,
  PropsWithChildren,
  useEffect,
  ReactNode,
  useState,
  useRef,
} from 'react';
import { Dropdown, MenuProps, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { WEEK_LIST } from '@/constant/config';
import DatePickerNoInput, {
  IDatePickerNoInputRef,
} from '@/components/DatePickerNoInput';

import styles from './style.module.less';
interface IDeadLine {}

enum MENU_ITEM_ENUM {
  TODAY,
  TOMORROW,
  SELECT,
}

const DeadLine: FC<PropsWithChildren<IDeadLine>> = ({ children }) => {
  const [selectDate, setSelectDate] = useState(null);
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
  const dataPickerRef = useRef<IDatePickerNoInputRef>(null);
  const [open, setOpen] = useState(false);

  // todo 页面跨天
  useEffect(() => {
    const today = WEEK_LIST[dayjs(new Date()).day()];
    const tomorrow = WEEK_LIST[dayjs(new Date()).add(1, 'day').day()];
    setMenuItems([
      {
        key: MENU_ITEM_ENUM.TODAY,
        label: (
          <div className={styles['menu-item']}>
            <span>今天</span>
            <span>{today}</span>
          </div>
        ),
      },
      {
        key: MENU_ITEM_ENUM.TOMORROW,
        label: (
          <div className={styles['menu-item']}>
            <span>明天</span>
            <span>{tomorrow}</span>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: MENU_ITEM_ENUM.SELECT,
        label: '选择日期',
      },
    ]);
  }, []);

  const handleClick = ({ key }: { key: string }) => {
    switch (Number(key)) {
      case MENU_ITEM_ENUM.TODAY:
        break;
      case MENU_ITEM_ENUM.TOMORROW:
        break;
      case MENU_ITEM_ENUM.SELECT:
        dataPickerRef.current?.setVisible(true);
        break;
    }
  };

  const onChange = (...arg) => {
    console.log(arg);
  };

  return (
    <div>
      <Dropdown
        overlayStyle={{
          minWidth: 200,
        }}
        menu={{ items: menuItems, onClick: handleClick }}
        trigger={['click']}
      >
        {children}
      </Dropdown>
      <DatePickerNoInput size='small' ref={dataPickerRef} onChange={onChange} />
    </div>
  );
};

export default DeadLine;
