import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LIST_SYMBOL } from '../constant';
import { IHandleSwitch } from '../type';
import { IDragList } from '../type';
import { isNil } from 'lodash-es';
interface IBlank {
  index: number;
  handleSwitch: IHandleSwitch;
}

const Blank: FC<IBlank> = ({ index, handleSwitch }) => {
  const domRef = useRef(null);

  const [, dropRef] = useDrop<IDragList>(() => ({
    accept: [LIST_SYMBOL],
    hover(item, monitor) {
      if (!isNil(item.index)) {
        if (item.gIndex === index + 1) return;
        handleSwitch([item.gIndex, item.index], [index + 1]);
        item.gIndex = index + 1;
        item.index = undefined;
      }
    },
  }));
  dropRef(domRef);
  return (
    <div
      ref={domRef}
      style={{
        minHeight: 6,
      }}
    ></div>
  );
};

export default Blank;
