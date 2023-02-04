import { props, createAction } from '@ngrx/store';
import {
	IModelTodoGet,
	IModelTodoCreateForm,
	IModelTodoUpdateForm,
	ISortData,
	IModelTodoDeleteForm,
	IOperationError,
} from '../types';

//todoListReducer actions
export const getData = createAction('GetData');
export const getDataSuccess = createAction(
	'GetDataSuccess',
	props<{ data: IModelTodoGet }>()
);
export const getDataError = createAction(
	'GetDataError',
	props<{ error: IOperationError }>()
);

export const addEntry = createAction(
	'AddEntry',
	props<{ data: IModelTodoCreateForm }>()
);
export const addEntrySuccess = createAction(
	'AddEntrySuccess',
	props<{ data: IModelTodoGet }>()
);
export const addEntryError = createAction(
	'AddEntryError',
	props<{ error: IOperationError }>()
);

export const deleteEntry = createAction(
	'DeleteEntry',
	props<{ data: IModelTodoDeleteForm }>()
);
export const deleteEntrySuccess = createAction(
	'DeleteEntrySuccess',
	props<{ data: string }>()
);
export const deleteEntryError = createAction(
	'DeleteEntryError',
	props<{ error: IOperationError }>()
);

export const updateEntry = createAction(
	'UpdateEntry',
	props<{ id: string; data: IModelTodoUpdateForm }>()
);
export const updateEntrySuccess = createAction(
	'UpdateEntrySuccess',
	props<{ data: IModelTodoGet }>()
);
export const updateEntryError = createAction(
	'UpdateEntryError',
	props<{ error: IOperationError }>()
);

export const setSortData = createAction(
	'setSortData',
	props<{ sortData: ISortData }>()
);
