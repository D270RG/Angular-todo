// //TODO: Action groups
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as todoListActions from 'src/app/storage/TodoListActions';
import { todoListContent } from '../types';

export type State = {todoList:todoListContent|undefined,message:string};
export const initialState = {todoList:undefined,message:''} as State;

// Creating reducer
export const todoListReducer = createReducer(
  initialState,
  on(todoListActions.getData,((state,action)=>{
    if(action.payload.message){
      return({...state,message:action.payload.message});
    } else {
      return({...state,message:'No message provided'});
    }
  })),

  on(todoListActions.addEntry,((state,action)=>(state))),

  on(todoListActions.deleteEntry,((state,action)=>(state))),

  on(todoListActions.updateEntry,((state,action)=>(state))),

  on(todoListActions.operationSuccess,((state)=>(state))),
  on(todoListActions.operationError,((state)=>(state))),

  on(todoListActions.writeData,((state,action)=>{
                      return({...state,todoList:action.payload.data,message:action.payload.message});
                    })),
);