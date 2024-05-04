import {
  LIST_DEFAULT_NAME,
  GROUP_DEFAULT_NAME,
  LIST_COPY_SUFFIX,
} from '@/constant/config';
import { TListOrGroup } from '@/store/todoList';
import { LIST_ENUM } from '@/constant/enum';
import { ITodoList, ITodoGroup } from '@/type';

const Default_Name_Map = new Map([
  [LIST_ENUM.LIST, LIST_DEFAULT_NAME],
  [LIST_ENUM.GROUP, GROUP_DEFAULT_NAME],
]);

export const getListOrGroup = (list: TListOrGroup[], type: LIST_ENUM) => {
  return list.reduce<TListOrGroup[]>((prev, cur) => {
    if (cur.type === type) {
      return [...prev, cur];
    } else {
      return [...prev, ...((cur as ITodoGroup).todoList || [])];
    }
  }, []);
};

// function getListOrGroup(
//   list: TListOrGroup[],
//   type: LIST_ENUM.LIST
// ): ITodoList[];
// function getListOrGroup(
//   list: TListOrGroup[],
//   type: LIST_ENUM.GROUP
// ): ITodoGroup[];
// function getListOrGroup(
//   list: TListOrGroup[],
//   type: LIST_ENUM
// ): (ITodoGroup | ITodoList)[] {
//   return list.reduce<TListOrGroup[]>((prev, cur) => {
//     if (cur.type === type) {
//       return [...prev, cur];
//     } else {
//       return [...prev, ...((cur as ITodoGroup).todoList || [])];
//     }
//   }, []);
// }

export const getById = (list: TListOrGroup[], type: LIST_ENUM, id: id) => {
  const allList = getListOrGroup(list, type);
  return allList.find(item => item.id === id);
};

export const createNewName = (list: TListOrGroup[], type: LIST_ENUM) => {
  const allList = getListOrGroup(list, type);
  const defaultName = Default_Name_Map.get(type) || LIST_DEFAULT_NAME;
  let i = 0;
  let newName = defaultName;
  while (true) {
    newName = i === 0 ? defaultName : `${defaultName}(${i})`;
    if (
      allList.some(item => {
        return item.title === newName;
      })
    ) {
      i++;
    } else {
      break;
    }
  }
  return newName;
};

export const createCopyName = (list: TListOrGroup[], copyId: id): string => {
  const allList = getListOrGroup(list, LIST_ENUM.LIST) as ITodoList[];
  const copyItem = allList.find(item => item.id === copyId)!;
  let defaultName = copyItem.title + ' ' + LIST_COPY_SUFFIX;
  let i = 1;
  let newName = defaultName;
  while (true) {
    if (
      allList.some(item => {
        return item.title === newName;
      })
    ) {
      newName = `${defaultName}(${i})`;
      i++;
    } else {
      break;
    }
  }
  return newName;
};

export const getRename = ({
  list,
  modifyId,
  value,
  type,
}: {
  list: TListOrGroup[];
  modifyId?: id;
  value: string;
  type: LIST_ENUM;
}) => {
  const allList = getListOrGroup(list, type);
  let newTitle = value;
  while (true) {
    if (allList.some(item => item.title === newTitle && item.id !== modifyId)) {
      newTitle = `${newTitle}(1)`;
    } else {
      break;
    }
  }
  return newTitle;
};
