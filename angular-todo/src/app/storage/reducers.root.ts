// //TODO: Action groups
import { combineReducers } from '@ngrx/store';
import { modalReducer, ModalState } from './reducers.modal';
import { TodoListInitialState, todoListReducer } from './reducers.todoList';

export interface RootState {
	todoListState: TodoListInitialState;
	modalState: ModalState;
}
export const combinedRootReducer = combineReducers({
	modal: modalReducer,
	todoList: todoListReducer,
});
