import { props,createAction } from "@ngrx/store";
import { todoListContent, todoPostForm } from "../types";

export const getData = createAction('[Todo Component] GetData',props<{payload:{message:string }}>());
export const getDataSuccess = createAction('[Todo Component] GetDataSuccess');
export const getDataError = createAction('[Todo Component] GetDataError');


export const addEntry = createAction('[Todo Component] AddEntry',
            props<{payload:{data: todoPostForm }}>());

export const deleteEntry = createAction('[Todo Component] DeleteEntry',
            props<{payload:{id: string}}>());

export const updateEntry = createAction('[Todo Component] UpdateEntry',
            props<{payload:{id: string,data: todoPostForm}}>());

export const operationSuccess = createAction('[Todo Component] OperationSuccess');
export const operationError = createAction('[Todo Component] OperationError');

export const writeData = createAction('[Todo Component] WriteData',props<{payload:{data: todoListContent,message:string }}>());