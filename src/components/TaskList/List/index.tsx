import React, { FC, useRef, useState, useMemo, memo, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { isNil, isEmpty, last } from 'lodash-es';
import { IDragList, IHandleSwitch, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';
import Input from '@/components/Input';
import { ListIcon } from '@/components/Icons';
import ListItem from '@/components/ListItem';
import styles from './style.module.less';
import { InputRef, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TodoListActions } from '@/store/todoList';
import { groupSelector } from '@/store/selector';
import { confirmFuc } from '@/utils';
import { LIST_ENUM } from '@/constant/enum';
import { isEqual } from 'lodash-es';

interface ITaskList {
  id: number;
  index?: number;
  gIndex: number;
  gId?: id;
  title: string;
}

enum MenuKeyEnum {
  REMOVE = 'REMOVE',
  ADD = 'ADD',
  RENAME = 'RENAME',
  COPY = 'COPY',
  MOVE = 'MOVE',
  REMOVE_FROM_GROUP = 'REMOVE_FROM_GROUP',
}

const TaskList: FC<ITaskList> = ({ index, gIndex, title, id, gId }) => {
  const [editable, setEditable] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();
  const groups = useAppSelector(groupSelector);

  const handleSwitch: IHandleSwitch = (prev, next) => {
    dispatch(TodoListActions.switchData([prev, next]));
  };

  const handleRename = (value: string) => {
    dispatch(
      TodoListActions.renameData({
        value,
        id,
        type: LIST_ENUM.LIST,
      })
    );
  };

  const removeList = () => {
    dispatch(
      TodoListActions.removeList({
        gIndex,
        index,
      })
    );
  };

  const moveToGroup = (moveToGId: id) => {
    dispatch(
      TodoListActions.moveToGroup({
        gIndex,
        index,
        moveToGId,
      })
    );
  };

  const removeListFromGroup = () => {
    dispatch(
      TodoListActions.removeFromGroup({
        gIndex,
        index: index!,
      })
    );
  };
  const copyList = () => {
    dispatch(
      TodoListActions.copyList({
        gIndex,
        index: index!,
      })
    );
  };

  const [{ isDragging, handlerId }, dragRef] = useDrag(
    () => ({
      type: LIST_SYMBOL,
      item: {
        index,
        gIndex: gIndex,
        type: LIST_SYMBOL,
      },
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },
      canDrag(monitor) {
        return !editable;
      },
    }),
    [index, gIndex, editable]
  );

  const [{ canDrop }, dropRef] = useDrop<IDragList | IDragGroup>(
    () => ({
      accept: [LIST_SYMBOL, GROUP_SYMBOL],
      hover: (item, monitor) => {
        if (item.type === GROUP_SYMBOL) {
          if (index === null || index === undefined) {
            handleSwitch?.([item.index!], [gIndex]);
            item.index = gIndex;
          }
          return;
        }
        if (item.id === id) {
          return;
        }
        const dragIndex = item?.index!;
        if (item?.gIndex === gIndex) {
          if (index === dragIndex) {
            return;
          }
          let dragDom = domRef.current!;
          const hoverBoundingRect = dragDom.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const hoverActualY =
            monitor?.getClientOffset?.()!.y - hoverBoundingRect.top;
          // 如果是向下拖，只有当hover的坐标小于自身高度的一半时，继续保持drag，否则相当于要挪动其他的list item，给当前的item腾个地方
          if (dragIndex < index! && hoverActualY < hoverMiddleY) return;
          // 如果是向上拖，只有当hover的坐标大于自身高度的一半时，继续保持drag，否则相当于要挪动其他的list item，给当前的item腾个地方
          if (dragIndex > index! && hoverActualY > hoverMiddleY) return;
        }
        handleSwitch?.([item?.gIndex, dragIndex], [gIndex, index]);

        item.index = index;
        item.gIndex = gIndex;
      },
      collect: monitor => {
        return {
          canDrop: !!monitor.canDrop(),
        };
      },
      canDrop: () => {
        return false;
      },
    }),
    [index, gIndex, handleSwitch]
  );
  const changeTitle = (value: string) => {
    if (value !== title && value) {
      handleRename(value);
    }
    setEditable(false);
  };
  dropRef(dragRef(domRef));
  const onDelete = async () => {
    await confirmFuc({
      title: '删除列表',
      content: `将永久删除"${title}"`,
    });
    removeList();
  };
  const onRename = () => {
    setEditable(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };
  const onMove = (key: string) => {
    moveToGroup(Number(key));
  };
  const onRemoveFromGroup = () => {
    removeListFromGroup();
  };
  const onCopy = () => {
    copyList();
  };

  const onMenuClick = (key: string, keyPath: string[]) => {
    const parentKey = last(keyPath);
    switch (parentKey) {
      case MenuKeyEnum.REMOVE:
        onDelete();
        break;
      case MenuKeyEnum.RENAME:
        onRename();
        break;
      case MenuKeyEnum.COPY:
        onCopy();
        break;
      case MenuKeyEnum.MOVE:
        onMove(key);
        break;
      case MenuKeyEnum.REMOVE_FROM_GROUP:
        onRemoveFromGroup();
        break;
    }
  };

  const contextMenuItems = useMemo<MenuProps['items']>(() => {
    const otherGroup = groups
      ?.filter(item => {
        return gId !== item.id;
      })
      .map(item => {
        return {
          label: item.title,
          key: item.id,
        };
      });

    let menus: MenuProps['items'] = [
      {
        label: '重命名列表',
        key: MenuKeyEnum.RENAME,
      },
      {
        label: '复制列表',
        key: MenuKeyEnum.COPY,
      },
      {
        label: '移动到',
        key: MenuKeyEnum.MOVE,
        children: otherGroup,
      },
      {
        label: '从组中删除',
        key: MenuKeyEnum.REMOVE_FROM_GROUP,
      },
      {
        type: 'divider',
      },
      {
        label: '删除列表',
        key: MenuKeyEnum.REMOVE,
        danger: true,
      },
    ];
    if (isNil(index)) {
      menus = menus.filter(x => x?.key !== MenuKeyEnum.REMOVE_FROM_GROUP);
    }
    if (isEmpty(otherGroup)) {
      menus = menus.filter(x => x?.key !== MenuKeyEnum.MOVE);
    }
    return menus;
  }, [index, groups, gId]);

  return (
    <ListItem
      icon={<ListIcon />}
      onDoubleClick={() => {
        setEditable(true);
        setTimeout(() => {
          // inputRef.current?.focus();
          inputRef.current?.select();
        }, 0);
      }}
      data-handler-id={handlerId}
      // className={styles['todo-list']}
      contextMenus={{
        items: contextMenuItems,
        onClick(e) {
          onMenuClick(e.key, e.keyPath);
        },
      }}
      ref={domRef}
    >
      {editable ? (
        <Input
          value={title}
          onBlur={e => changeTitle(e.target.value)}
          onEnter={changeTitle}
          ref={inputRef}
          size='small'
        />
      ) : (
        title
      )}
    </ListItem>
  );
};

export default memo(TaskList, (prev, next) => {
  return isEqual(prev, next);
});
