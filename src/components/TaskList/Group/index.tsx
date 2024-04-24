import React, { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskList from '../List';
import Input from '@/components/Input';
import { IDragList, IHandleSwitch, IDragGroup } from '../type';
import { LIST_SYMBOL, GROUP_SYMBOL } from '../constant';
import { ITodoList } from '@/type';
import { InputRef } from 'antd';

interface ITaskGroup {
  id: number;
  index: number;
  title: string;
  todoList: ITodoList[];
  handleSwitch: IHandleSwitch;
  handleRename?: (id: id, value: string) => void;
}

const TaskGroup: FC<ITaskGroup> = ({
  handleSwitch,
  handleRename,
  index,
  title,
  id,
  todoList,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const [editable, setEditable] = useState(false);
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
      handleRename?.(id, value);
    }
    setEditable(false);
  };

  return (
    <div ref={domRef}>
      <div
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
      <div>
        {todoList.map((item, _index) => {
          return (
            <TaskList
              id={item.id}
              key={item.title}
              title={item.title}
              handleSwitch={handleSwitch}
              handleRename={handleRename}
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
