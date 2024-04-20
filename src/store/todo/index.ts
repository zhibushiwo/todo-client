import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import { ITodo, ITodoGroup, ITodoList } from '@/type';
import { NAME } from './const';

const initialState: ITodo[] = [];

export const todoSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<ITodo[]>) {
      return action.payload;
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.push(action.payload);
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      const todo = action.payload;
      let index = state.findIndex(({ id }) => id === todo.id);
      if (index < 0) {
        state.push(todo);
      } else {
        state[index] = todo;
      }
    },
    removeTodo(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < 0) return;
      state.splice(index, 1);
    },
  },
});

export const TodoActions = todoSlice.actions;

export default todoSlice.reducer;
