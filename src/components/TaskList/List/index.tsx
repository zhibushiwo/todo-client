import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IDragList, IChangeFunc, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';

import styles from './style.module.less';
interface ITaskList {
  id: number;
  index?: number;
  gIndex: number;
  title: string;
  changeFunc: IChangeFunc;
}

const TaskList: FC<ITaskList> = ({ changeFunc, index, gIndex, title, id }) => {
  const domRef = useRef<HTMLDivElement>(null);
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
    }),
    [index, gIndex]
  );

  const [{ canDrop }, dropRef] = useDrop<IDragList | IDragGroup>(
    () => ({
      accept: [LIST_SYMBOL, GROUP_SYMBOL],
      hover: (item, monitor) => {
        if (item.type === GROUP_SYMBOL) {
          if (index === null || index === undefined) {
            changeFunc([item.index!], [gIndex]);
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
        changeFunc([item?.gIndex, dragIndex], [gIndex, index]);

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
    [index, gIndex, changeFunc]
  );
  dropRef(dragRef(domRef));
  return (
    <div
      ref={domRef}
      data-handler-id={handlerId}
      className={styles['todo-list']}
    >
      {title}
    </div>
  );
};

export default TaskList;
