import { createReducer, on } from '@ngrx/store';
import { createAction } from '@ngrx/store';


type todoInitialStateType={
  id:string,
  name:string,
  createdDate:string,
  updatedData:string,
  link:string,
  comment:string,
  tags:string[]
}[] | undefined;
export const todoInitialState = undefined as todoInitialStateType;

export const setData = createAction('[Todo Component] SetData');
export const unsetData = createAction('[Todo Component] UnsetData');
export const addEntry = createAction('[Todo Component] AddEntry');
export const deleteEntry = createAction('[Todo Component] DeleteEntryById');

export const todoReducer = createReducer(
  todoInitialState,
  on(setData, (state) => {
    //fetch and set
    return(state + 1);
  }),
  on(unsetData, (state) => {
    //fetch and set
    return(state + 1);
  }),
  on(addEntry, (state) => {
    //fetch and update
    return(state + 1);
  }),
  on(deleteEntry, (state) => {
    //fetch and update
    return(state + 1);
  }),
  
);