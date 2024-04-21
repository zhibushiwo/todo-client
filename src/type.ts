
export interface ITodo {
  id: number;
  title: string;
  status?: number;
  importance?: number;
  steps?: ITodoStep[];
  listId?: number;
  todoType?: string;
  hasAttachment?: boolean;
  hasRemark?: boolean;
  remindData?: string;
  isRepeat?: boolean;
}

export interface ITodoStep {
  id: number;
  title: string;
  todoId: number;
  status?: number;
}

export interface ITodoList {
  id: number;
  title: string;
  groupId?: number;
  todos?: ITodo[];
}

export interface ITodoGroup {
  id: number;
  title: string;
  todoList?: ITodoList[];
}

