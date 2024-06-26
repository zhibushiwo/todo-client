import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getListOrGroup } from './todoList/utils';
import { LIST_ENUM, TODO_IMPORTANT_ENUM } from '@/constant/enum';
import { pick } from 'lodash-es';
const selectSelf = (state: RootState) => state;

export const groupSelector = createSelector(selectSelf, state => {
  return (
    getListOrGroup(state.todoListReducer, LIST_ENUM.GROUP).map(item =>
      pick(item, 'id', 'title')
    ) || []
  );
});

export const todoTypeSelector = createSelector(selectSelf, state => {
  return (
    getListOrGroup(state.todoListReducer, LIST_ENUM.LIST).map(item =>
      pick(item, 'id', 'title')
    ) || []
  );
});


export const listSelector = createSelector(selectSelf, state => {
  return getListOrGroup(state.todoListReducer, LIST_ENUM.LIST) || [];
});

export const importantTodoSelector = createSelector(selectSelf, state => {
  return state.todoReducer.filter(
    item => item.importance === TODO_IMPORTANT_ENUM.IMPORTANT
  );
});


