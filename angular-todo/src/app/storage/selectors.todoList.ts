import { Dictionary } from '@ngrx/entity';
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector,
} from '@ngrx/store';
import { ITodoElement } from '../types';
import { RootState } from './reducers.root';
import { TodoListInitialState } from './reducers.todoList';
import { createSortComparer } from './utils';

const selectTodoList = createFeatureSelector<TodoListInitialState>('todoList');
//--Secondary selectors (2)--
export const selectTodoEntities = createSelector(selectTodoList, (state) => {
	console.log('selection todo entities', state);
	return state.todoList.entities;
});
export const selectSortParameters = createSelector(
	selectTodoList,
	(state) => state.sortParams
);

//--App selectors (3)--
export const selectTodoValues = createSelector(
	selectTodoEntities,
	(todoEntities) => {
		const values = Object.values(todoEntities);
		if (!values) {
			return [];
		}
		return <ITodoElement[]>values;
	}
);
export const selectTodoById = (
	id: string
): MemoizedSelector<
	RootState,
	ITodoElement | undefined,
	(s1: Dictionary<ITodoElement>) => ITodoElement | undefined
> => createSelector(selectTodoEntities, (todoEntities) => todoEntities[id]);

export const selectSortedTodoList = createSelector(
	selectTodoValues,
	selectSortParameters,
	(todoValues, sortParams) => todoValues.sort(createSortComparer(sortParams))
);
//--Special selectors(4)--
export const selectTodoCommentById = (
	id: string
): MemoizedSelector<
	RootState,
	string | undefined,
	(s1: ITodoElement | undefined) => string | undefined
> => createSelector(selectTodoById(id), (todoEntry) => todoEntry?.comment);
