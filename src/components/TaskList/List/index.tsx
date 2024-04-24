import React, { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { isNil } from 'lodash-es';
import { IDragList, IHandleSwitch, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';
import Input from '@/components/Input';
import styles from './style.module.less';
import { InputRef } from 'antd';
interface ITaskList {
  id: number;
  index?: number;
  gIndex: number;
  title: string;
  handleSwitch?: IHandleSwitch;
  handleUpdate?: (key: TKeyPath, value: any) => void;
  handleRename?: (id: id, value: string) => void;
}

const TaskList: FC<ITaskList> = ({
  handleSwitch,
  handleUpdate,
  handleRename,
  index,
  gIndex,
  title,
  id,
}) => {
  const [editable, setEditable] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
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
      handleRename?.(id, value);
    }
    setEditable(false);
  };
  dropRef(dragRef(domRef));
  return (
    <div
      ref={domRef}
      data-handler-id={handlerId}
      className={styles['todo-list']}
      onDoubleClick={() => {
        setEditable(true);
        setTimeout(() => {
          // inputRef.current?.focus();
          inputRef.current?.select();
        }, 0);
      }}
    >
      {editable ? (
        <Input
          value={title}
          onBlur={e => changeTitle(e.target.value)}
          onEnter={changeTitle}
          ref={inputRef}
        />
      ) : (
        title
      )}
    </div>
  );
};

export default TaskList;
