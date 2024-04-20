import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo';
import todoListReducer from './todoList';

export const store = configureStore({
  reducer: {
    todoReducer,
    todoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
