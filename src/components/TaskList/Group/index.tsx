import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskList from '../List';

import { IDragList, IChangeFunc, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';
import { ITodoList } from '@/type';
interface ITaskGroup {
  id: number;
  index: number;
  title: string;
  todoList: ITodoList[];
  changeFunc: IChangeFunc;
}

const TaskGroup: FC<ITaskGroup> = ({ changeFunc, index, title, id, todoList }) => {
  const domRef = useRef<HTMLDivElement>(null);
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
    }),
    [index]
  );

  const [, dropRef] = useDrop<IDragGroup | IDragList>(
    () => ({
      accept: [LIST_SYMBOL, GROUP_SYMBOL],
      hover(item, monitor) {
        const dragIndex = item?.index!;
        if (monitor.getItemType() === LIST_SYMBOL) {
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
            cIndex = lists.length;
          }
          changeFunc([item.gIndex, item.index], [index, cIndex]);
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
        console.log('list changeFunc');
        changeFunc([dragIndex], [index]);
        item.index = index;
      },
    }),
    [todoList, index, changeFunc]
  );

  dropRef(dragRef(domRef));
  return (
    <div ref={domRef}>
      <div>{title}</div>
      <div>
        {todoList.map((item, _index) => {
          return (
            <TaskList
              id={item.id}
              key={item.title}
              title={item.title}
              changeFunc={changeFunc}
              index={_index}
              gIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskGroup;
