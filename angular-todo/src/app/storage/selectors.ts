import { createSelector } from '@ngrx/store';
import { ITodoElement } from '../types';
import { RootState } from './reducers';
import { createSortComparer } from './utils';

//----------------------------------------------------------------------------------------------------------------
//
//Combined state example:
//
// export const mainReducer:AuthModuleState = {
//     todoList: todoListReducer,
//     otherReducer: otherReducer
//     anotherReducer anotherReducer
// };
// export const combinedReducer = combineReducers(mainReducer)
//
//Selector usage:
//
// export const getTodoState = createFeatureSelector<combinedReducer.State>('todoList');
// export const selectUsersList = createSelector(selectTodoState, (state)=>{} /*OR entitySelector*/);
//
//----------------------------------------------------------------------------------------------------------------

//--Primary selector (1)--
const selectState = (state: RootState) => state.todoListState;

//--Secondary selectors (2)--
export const selectTodoEntities = createSelector(selectState, (state) => {
	console.log(state);
	return state.todoList.entities;
});
export const selectSortParameters = createSelector(
	selectState,
	(state) => state.sortParams
);

//--App selectors (3)--
export const selectTodoValues = createSelector(
	selectTodoEntities,
	(todoEntities) => {
		let values = Object.values(todoEntities);
		if (!values) {
			return [];
		}
		return <ITodoElement[]>values;
	}
);
export const selectTodoById = (id: string) =>
	createSelector(selectTodoEntities, (todoEntities) => todoEntities[id]);

export const selectSortedTodoList = createSelector(
	selectTodoValues,
	selectSortParameters,
	(todoValues, sortParams) => todoValues.sort(createSortComparer(sortParams))
);
