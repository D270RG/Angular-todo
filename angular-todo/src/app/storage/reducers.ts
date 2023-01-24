// //TODO: Action groups
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as actions from 'src/app/storage/actions';
import { todoListContent } from '../types';

export type TodoListState = {todoList:todoListContent|undefined,message:string};
export const TodoListInitialState = {todoList:undefined,message:''} as TodoListState;


export const todoListReducer = createReducer(
  TodoListInitialState,
  on(actions.getData,((state,action)=>{
      return(state);
  })),

  // on(actions.addEntry,((state,action)=>state)),

  // on(actions.deleteEntry,((state,action)=>state)),

  // on(actions.updateEntry,((state,action)=>state)),

  // on(actions.operationSuccess,((state)=>state)),
  on(actions.operationError,((state,action)=>{console.log(action.payload.error);return(state)})),

  on(actions.writeData,((state,action)=>{
                      console.log('write data',action.payload.data,'state',state,'fired by',action.type);
                      return({...state,todoList:action.payload.data});
                    })),
  // on(actions.writeSortedData,((state,action)=>state))
);

export type SortState = {sortColumn:string,sortDirection:'asc'|'desc'|''}
export const SortInitialState = {sortColumn:'',sortDirection:''}
export const sortReducer = createReducer(
  SortInitialState,
  on(actions.setSortColumn,((state,action)=>({...state,sortColumn:action.payload.sortColumn}))),
  on(actions.setSortDirection,((state,action)=>({...state,sortDirection:action.payload.sortDirection})))
);