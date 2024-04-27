import React, { FC, forwardRef, useState, Fragment } from 'react';
import { MenuProps, Dropdown } from 'antd';
import { isNil } from 'lodash-es';
import styles from './style.module.less';
interface IListItem extends React.HtmlHTMLAttributes<HTMLDivElement> {
  icon: React.ReactElement;
  suffix?: React.ReactElement;
  contextMenus?: MenuProps;
}

const ListItem = forwardRef<HTMLDivElement, IListItem>(
  (
    {
      contextMenus,
      className,
      suffix,
      children,
      icon,
      ...otherProps
    }: IListItem,
    ref
  ) => {
    const needContextMenu = !isNil(contextMenus);
    const content = (
      <div
        className={`${className} ${styles['list-item']}`}
        ref={ref}
        {...otherProps}
      >
        <span className={styles['item-icon']}>{icon}</span>
        <span className={styles['item-content']}>{children}</span>
        <span>{suffix}</span>
      </div>
    );
    if (needContextMenu) {
      return (
        <Dropdown
          destroyPopupOnHide
          overlayStyle={{ minWidth: 150 }}
          menu={contextMenus}
          trigger={['contextMenu']}
        >
          {content}
        </Dropdown>
      );
    } else {
      return <Fragment>{content}</Fragment>;
    }
  }
);

export default ListItem;
