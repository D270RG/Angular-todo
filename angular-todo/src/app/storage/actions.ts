import { props,createAction } from "@ngrx/store";
import { todoCreateForm, todoListContent, todoUpdateForm} from "../types";

//todoListReducer actions
export const getData = createAction('[Todo Component] GetData');
export const getDataSuccess = createAction('[Todo Component] GetDataSuccess');
export const getDataError = createAction('[Todo Component] GetDataError');

export const addEntry = createAction('[Todo Component] AddEntry',
            props<{payload:{data: todoCreateForm }}>());

export const deleteEntry = createAction('[Todo Component] DeleteEntry',
            props<{payload:{id: string}}>());

export const updateEntry = createAction('[Todo Component] UpdateEntry',
            props<{payload:{id: string,data: todoUpdateForm}}>());

export const operationSuccess = createAction('[Todo Component] OperationSuccess',props<{payload:{requireLoad:boolean,data?:string}}>());
export const operationError = createAction('[Todo Component] OperationError',props<{payload:{requireLoad:boolean,error:string}}>());

export const writeData = createAction('[Todo Component] WriteData',props<{payload:{data:todoListContent}}>());
export const writeSortedData = createAction('[Todo Component] WriteSortedData',props<{payload:{data:todoListContent|undefined,sortColumn:string,sortDirection:'asc'|'desc'|''}}>());
//sortReducer actions
export const setSortColumn = createAction('[Sort Component] SetSortColumn',props<{payload:{sortColumn:string}}>());
export const setSortDirection = createAction('[Sort Component] SetSortDirection',props<{payload:{sortDirection:'asc'|'desc'|''}}>());