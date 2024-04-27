import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isNil, set, uniqueId, get, isEmpty } from 'lodash-es';
import { LIST_ENUM } from '@/constant/enum';
import { NAME, INIT_ACTION } from './const';
import { ITodoList, ITodoGroup } from '@/type';
import { TSwitchPath } from '@/components/TaskList/type';
import { createNewName, getRename, getById } from './utils';

export type TListOrGroup = ITodoList | ITodoGroup;

export type keyOfList = keyof ITodoList | keyof ITodoGroup;

export type valueOfList =
  | ITodoList[keyof ITodoList]
  | ITodoGroup[keyof ITodoGroup];

const initialState: TListOrGroup[] = [];

export const initTodoListData = createAsyncThunk<
  TListOrGroup[],
  TListOrGroup[]
>(INIT_ACTION, async (param, store) => {
  console.log(param);
  console.log(store.getState());
  return await Promise.resolve([]);
});

export const todoListSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<TListOrGroup[]>) {
      return action.payload;
    },
    addData(state, action: PayloadAction<LIST_ENUM>) {
      const newName = createNewName(state, action.payload);
      state.push({
        title: newName,
        id: Number(uniqueId()),
        type: action.payload,
      });
    },
    addListByGroupIndex(state, action: PayloadAction<number>) {
      const newName = createNewName(state, LIST_ENUM.LIST);
      const newData = {
        id: Number(uniqueId()),
        title: newName,
        type: LIST_ENUM.LIST,
      };
      if (isEmpty((state[action.payload] as ITodoGroup).todoList)) {
        (state[action.payload] as ITodoGroup).todoList = [newData];
      } else {
        (state[action.payload] as ITodoGroup).todoList?.push(newData);
      }
    },
    renameData(
      state,
      action: PayloadAction<{
        value: string;
        id: id;
        type: LIST_ENUM;
      }>
    ) {
      const { value, id, type } = action.payload;
      const current = getById(state, type, id);
      console.log(current);
      let newName = getRename({
        list: state,
        value,
        type,
        modifyId: current?.id,
      });
      console.log(newName);
      if (current) current.title = newName;
    },
    editData(
      state,
      action: PayloadAction<{
        gIndex: number | null;
        index: number;
        data: TListOrGroup;
      }>
    ) {
      const { gIndex, index, data } = action.payload;
      if (isNil(gIndex)) {
        state[index] = data;
      } else {
        (state[gIndex] as ITodoGroup).todoList![index] = data;
      }
    },

    updateDataByKey(
      state,
      action: PayloadAction<{
        key: TKeyPath;
        value: any;
      }>
    ) {
      const { key, value } = action.payload;
      set(state, key, value);
    },
    removeList(
      state,
      action: PayloadAction<{
        gIndex: number;
        index?: number | null;
      }>
    ) {
      const { gIndex, index } = action.payload;
      if (isNil(index)) {
        state.splice(gIndex, 1);
      } else {
        (state[gIndex] as ITodoGroup).todoList?.splice(index, 1);
      }
    },
    removeGroup(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < 0) return;
      const group = state[index] as ITodoGroup;
      const lists = group.todoList || [];
      state.splice(index, 1, ...lists);
    },
    switchData(state, action: PayloadAction<[TSwitchPath, TSwitchPath]>) {
      const [prev, next] = action.payload;
      const hasChangeParent =
        prev[0] < next[0] && isNil(prev[1]) && !isNil(next[1]);
      let tmp;
      if (!isNil(prev[1])) {
        if (isNil((state[prev[0]] as ITodoGroup).todoList)) {
          (state[prev[0]] as ITodoGroup).todoList = [];
        }
        tmp = (state[prev[0]] as ITodoGroup).todoList!.splice(prev[1], 1)[0];
      } else {
        tmp = state.splice(prev[0], 1)[0];
      }
      let gIndex = hasChangeParent ? next[0] - 1 : next[0];
      let cIndex = next[1];
      if (!isNil(next[1])) {
        if (isNil((state[gIndex] as ITodoGroup).todoList)) {
          (state[gIndex] as ITodoGroup).todoList = [];
        }
        (state[gIndex] as ITodoGroup).todoList!.splice(cIndex!, 0, tmp);
      } else {
        state.splice(gIndex, 0, tmp);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(initTodoListData.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const TodoListActions = todoListSlice.actions;

export default todoListSlice.reducer;
