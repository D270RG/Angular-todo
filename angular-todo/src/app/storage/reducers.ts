import { props,createAction,createReducer, on } from '@ngrx/store';
import { todoListContent, todoPostForm } from '../types';
import { setData,unsetData,addEntry,deleteEntry } from './actions';
export const todoInitialState = undefined as todoListContent|undefined;

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