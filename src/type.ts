import { LIST_ENUM, TODO_STATUS_ENUM } from '@/constant/enum';
export interface ITodo {
  id: id;
  title: string;
  status?: TODO_STATUS_ENUM;
  importance?: number;
  steps?: ITodoStep[];
  listId?: id;
  todoType?: string;
  hasAttachment?: boolean;
  remark?: string;
  remindData?: string;
  isRepeat?: boolean;
}

export interface ITodoStep {
  id: id;
  title: string;
  todoId: id;
  completed?: boolean;
}

export interface ITodoList {
  id: id;
  title: string;
  groupId?: id;
  todos?: ITodo[];
  type: LIST_ENUM;
}

export interface ITodoGroup {
  type: LIST_ENUM;
  id: id;
  title: string;
  todoList?: ITodoList[];
}
