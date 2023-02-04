import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from 'src/app/storage/actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { HttpModule } from 'src/app/http.service';

@Injectable()
export class TodoListEffects {
	constructor(private httpModule: HttpModule, private actions$: Actions<any>) {}
	getData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(actions.getData.type),
			tap(console.log),
			switchMap(() =>
				this.httpModule.getTodos().pipe(
					map((loadedData) => actions.getDataSuccess({ data: loadedData })),
					catchError((err) => of(actions.getDataError(err)))
				)
			)
		)
	);

	addEntry$ = createEffect(() =>
		this.actions$.pipe(
			tap(console.log),
			ofType(actions.addEntry.type),
			switchMap((action) => {
				console.log('addEntry', action);
				return this.httpModule.createTodo(action.data).pipe(
					map((loadedData) => actions.addEntrySuccess({ data: loadedData })),
					catchError((err) => of(actions.addEntryError({ error: err })))
				);
			})
		)
	);

	updateEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(actions.updateEntry.type),
			switchMap((action) =>
				this.httpModule.updateTodo(action.id, action.data).pipe(
					map((loadedData) => actions.updateEntrySuccess({ data: loadedData })),
					catchError((err) => of(actions.updateEntryError({ error: err })))
				)
			)
		)
	);

	deleteEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(actions.deleteEntry.type),
			switchMap((action) =>
				this.httpModule.deleteTodo(action.data.id).pipe(
					map((loadedData) => actions.deleteEntrySuccess({ data: loadedData })),
					catchError((err) => of(actions.deleteEntryError({ error: err })))
				)
			)
		)
	);
}
