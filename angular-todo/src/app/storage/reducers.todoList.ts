import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';
import { ITodoElement, ISortData } from '../types';
import { on } from '@ngrx/store';
import * as actions from './actions.todoList';

export interface TodoListInitialState {
	todoList: EntityState<ITodoElement>;
	sortParams: ISortData;
}
const todoListAdapter = createEntityAdapter<ITodoElement>();

export const TodoListInitialState: TodoListInitialState = {
	todoList: todoListAdapter.getInitialState(),
	sortParams: {
		field: 'createdDate',
		direction: 'asc',
	},
};
export const todoListReducer = createReducer(
	TodoListInitialState,
	on(actions.getDataSuccess, (state, action) => {
		return {
			...state,
			todoList: todoListAdapter.setAll(action.data, state.todoList),
		};
	}),
	on(
		actions.addEntryError,
		actions.updateEntryError,
		actions.deleteEntryError,
		(state, action) => {
			console.log(action.error);
			return state;
		}
	),
	on(actions.addEntrySuccess, (state, action) => {
		return {
			...state,
			todoList: todoListAdapter.addOne(action.data, state.todoList),
		};
	}),
	on(actions.deleteEntrySuccess, (state, action) => {
		return {
			...state,
			todoList: todoListAdapter.removeOne(action.data, state.todoList),
		};
	}),
	on(actions.updateEntrySuccess, (state, action) => {
		const update = {
			id: action.data.id,
			changes: action.data,
		};
		return {
			...state,
			todoList: todoListAdapter.updateOne(update, state.todoList),
		};
	}),

	on(actions.setSortData, (state, action) => {
		console.log('action: setting sort data', { ...action.sortData });
		return {
			...state,
			sortParams: { ...action.sortData },
		};
	})
);
export const entitySelectors = todoListAdapter.getSelectors();
