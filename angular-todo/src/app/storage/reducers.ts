import { props,createAction,createReducer, on } from '@ngrx/store';
import { todoListContent, todoPostForm } from '../types';

export const todoInitialState = undefined as todoListContent|undefined;

export const setData = createAction('[Todo Component] SetData',
            props<{data: todoListContent }>());
export const unsetData = createAction('[Todo Component] UnsetData');
export const addEntry = createAction('[Todo Component] AddEntry',
            props<{data: todoPostForm }>());
export const deleteEntry = createAction('[Todo Component] DeleteEntryById',
            props<{id: string}>());

//TODO: Action groups
export const todoReducer = createReducer(
  todoInitialState,
  on(setData, (state,data) => {
    //fetch and set
    return(state); //return modified state
  }),
  on(unsetData, (state) => {
    state = undefined;
    return(state);
  }),
  on(addEntry, (state) => {
    //fetch and update
    return(state);
  }),
  on(deleteEntry, (state) => {
    //fetch and update
    return(state);
  })
);