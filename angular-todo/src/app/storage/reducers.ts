// //TODO: Action groups
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as todoListActions from 'src/app/storage/TodoListActions';
import { todoListContent } from '../types';


export const initialState = undefined as {todoList:todoListContent}|undefined;

// Creating reducer
export const todoListReducer = createReducer(
  initialState,
  on(todoListActions.getData,((state)=>{
    return(state);
  })),

  on(todoListActions.addEntry,((state,action)=>(state))),

  on(todoListActions.deleteEntry,((state,action)=>(state))),

  on(todoListActions.updateEntry,((state,action)=>(state))),

  on(todoListActions.operationSuccess,((state)=>(state))),
  on(todoListActions.operationError,((state)=>(state))),

  on(todoListActions.writeData,((state,action)=>{
                      return({...state,todoList:action.payload.data});
                    })),
);

// export function articleReducer(state: any, action: Action) {
//   return _articleReducer(state, action);
// }

// // Creating selectors
// export const getArticleState = createFeatureSelector<ArticleState>('articleState');

// export const getArticles = createSelector(
//     getArticleState, 
//     (state: ArticleState) => state.articles 
// );

// export const getMessage = createSelector(
//   getArticleState, 
//   (state: ArticleState) => state.message
// ); 