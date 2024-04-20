import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import { NAME, INIT_ACTION } from './const';
import { ITodoList, ITodoGroup } from '@/type';

type TListOrGroup = ITodoList | ITodoGroup;

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
    addData(state, action: PayloadAction<TListOrGroup>) {
      state.push(action.payload);
    },
    editData(
      state,
      action: PayloadAction<{
        groupIndex: number | null;
        index: number;
        data: TListOrGroup;
      }>
    ) {
      const { groupIndex, index, data } = action.payload;
      if (isNil(groupIndex)) {
        state[index] = data;
      } else {
        (state[groupIndex] as ITodoGroup).todoList![index] = data;
      }
    },
    removeList(
      state,
      action: PayloadAction<{
        groupIndex: number | null;
        index: number;
      }>
    ) {
      const { groupIndex, index } = action.payload;
      if (isNil(groupIndex)) {
        state.splice(index, 1);
      } else {
        (state[groupIndex] as ITodoGroup).todoList?.splice(index, 1);
      }
    },
    removeGroup(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < 0) return;
      const group = state[index] as ITodoGroup;
      const lists = group.todoList || [];
      state.splice(index, 1, ...lists);
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
