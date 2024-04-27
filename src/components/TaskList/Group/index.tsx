import React, { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskList from '../List';
import Input from '@/components/Input';
import { IDragList, IHandleSwitch, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';
import { ITodoList, ITodoGroup } from '@/type';
import { LIST_ENUM } from '@/constant/enum';
import { InputRef } from 'antd';
import { GroupIcon } from '@/components/Icons';
import ListItem from '@/components/ListItem';
import styles from './style.module.less';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { confirmFuc } from '@/utils/';
interface ITaskGroup {
  id: number;
  index: number;
  title: string;
  todoList: ITodoList[];
  groups?: Pick<ITodoGroup, 'id' | 'title'>[];
  handleSwitch: IHandleSwitch;
  handleRename?: (id: id, value: string, type: LIST_ENUM) => void;
  handleRemoveList: (gIndex: number, index?: number) => void;
  handleRemoveGroup: (index: number) => void;
  handleAddList: () => void;
}

enum MenuKeyEnum {
  REMOVE = 'REMOVE',
  RENAME = 'RENAME',
  ADD_LIST = 'ADD_LIST',
}

const TaskGroup: FC<ITaskGroup> = ({
  handleSwitch,
  handleRename,
  handleRemoveList,
  handleRemoveGroup,
  handleAddList,
  index,
  title,
  id,
  todoList = [],
  groups,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const [editable, setEditable] = useState(false);
  const [expand, setExpand] = useState(false);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: GROUP_SYMBOL,
      item: {
        title,
        index,
        type: GROUP_SYMBOL,
      },
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      canDrag(monitor) {
        return !editable;
      },
    }),
    [index, editable]
  );

  const [, dropRef] = useDrop<IDragGroup | IDragList>(
    () => ({
      accept: [LIST_SYMBOL, GROUP_SYMBOL],
      hover(item, monitor) {
        const dragIndex = item?.index!;
        if (monitor.getItemType() === LIST_SYMBOL) {
          if (!expand) setExpand(true);
          item = item as IDragList;
          if (!monitor.isOver({ shallow: true })) {
            return;
          }
          if (item.gIndex === index) {
            return;
          }
          let gIndex = index;
          if (
            item.gIndex < index &&
            (item.index === null || item.index === undefined)
          ) {
            gIndex = index - 1;
          }
          let cIndex = 0;
          if (item.gIndex > index) {
            cIndex = todoList.length;
          }
          handleSwitch([item.gIndex, item.index], [index, cIndex]);
          item.index = cIndex;
          item.gIndex = gIndex;
          return;
        }
        if (index === dragIndex) {
          return;
        }
        const hoverBoundingRect = domRef.current!.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY =
          monitor?.getClientOffset?.()!.y - hoverBoundingRect.top;
        // 如果是向下拖，只有当hover的坐标小于自身高度的一半时，继续保持drag，否则相当于要挪动其他的list item，给当前的item腾个地方
        // if dragging down, continue only when hover is smaller than middle Y
        if (dragIndex < index && hoverActualY < hoverMiddleY) return;
        // 如果是向上拖，只有当hover的坐标大于自身高度的一半时，继续保持drag，否则相当于要挪动其他的list item，给当前的item腾个地方
        if (dragIndex > index && hoverActualY > hoverMiddleY) return;
        console.log('list handleSwitch');
        handleSwitch([dragIndex], [index]);
        item.index = index;
      },
    }),
    [todoList, index, handleSwitch]
  );

  dropRef(dragRef(domRef));

  const changeTitle = (value: string) => {
    if (value !== title && value) {
      handleRename?.(id, value, LIST_ENUM.GROUP);
    }
    setEditable(false);
  };

  const onAddList = () => {
    handleAddList();
    if (!expand) setExpand(true);
  };

  const onRename = () => {
    setEditable(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };
  const onRemove = async () => {
    await confirmFuc({
      title: '删除分组',
      content: `将永久删除"${title}"`,
    });
    handleRemoveGroup(index);
  };

  const onMenuClick = (key: string) => {
    switch (key) {
      case MenuKeyEnum.ADD_LIST:
        onAddList();
        break;
      case MenuKeyEnum.REMOVE:
        onRemove();
        break;
      case MenuKeyEnum.RENAME:
        onRename();
        break;
    }
  };

  return (
    <div ref={domRef} className={styles['todo-group']}>
      <ListItem
        icon={<GroupIcon />}
        onClick={() => {
          setExpand(state => !state);
        }}
        contextMenus={{
          items: [
            {
              label: '重命名组',
              key: MenuKeyEnum.RENAME,
            },
            {
              label: '新建列表',
              key: MenuKeyEnum.ADD_LIST,
            },
            {
              type: 'divider',
            },
            {
              danger: todoList.length === 0,
              label: todoList.length > 0 ? '取消分组' : '删除组',
              key: MenuKeyEnum.REMOVE,
            },
          ],
          onClick: e => {
            onMenuClick(e.key);
          },
        }}
        suffix={expand ? <UpOutlined /> : <DownOutlined />}
      >
        <div>
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
        </div>
      </ListItem>
      {expand && (
        <div className={styles.list}>
          {todoList.length === 0 ? (
            <span className={styles.tips}>拖到此处来添加列表</span>
          ) : (
            todoList.map((item, _index) => {
              return (
                <TaskList
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  handleSwitch={handleSwitch}
                  handleRename={(id, value) => {
                    handleRename?.(id, value, LIST_ENUM.LIST);
                  }}
                  index={_index}
                  gIndex={index}
                  handleRemoveList={handleRemoveList}
                  gId={id}
                  groups={groups}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TaskGroup;
