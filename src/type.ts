import { LIST_ENUM } from '@/constant/enum';
export interface ITodo {
  id: id;
  title: string;
  status?: number;
  importance?: number;
  steps?: ITodoStep[];
  listId?: id;
  todoType?: string;
  hasAttachment?: boolean;
  hasRemark?: boolean;
  remindData?: string;
  isRepeat?: boolean;
}

export interface ITodoStep {
  id: id;
  title: string;
  todoId: id;
  status?: number;
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
