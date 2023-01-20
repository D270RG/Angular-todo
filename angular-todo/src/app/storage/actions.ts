import { props,createAction } from "@ngrx/store";
import { todoListContent, todoPostForm } from "../types";

export const getData = createAction('[Todo Component] GetData');
export const getDataSuccess = createAction('[Todo Component] GetDataSuccess',
            props<{data: todoListContent }>());
export const getDataError = createAction('[Todo Component] GetDataError');


export const addEntry = createAction('[Todo Component] AddEntry',
            props<{data: todoPostForm }>());
export const addEntrySuccess = createAction('[Todo Component] AddEntrySuccess');
export const addEntryError = createAction('[Todo Component] AddEntryError');

export const deleteEntry = createAction('[Todo Component] DeleteEntry',
            props<{id: string}>());
export const deleteEntrySuccess = createAction('[Todo Component] DeleteEntrySuccess');
export const deleteEntryError = createAction('[Todo Component] DeleteEntryError');

export const updateEntry = createAction('[Todo Component] UpdateEntry',
            props<{id: string,data: todoPostForm}>());
export const updateEntrySuccess = createAction('[Todo Component] UpdateEntrySuccess');
export const updateEntryError = createAction('[Todo Component] UpdateEntryError');
