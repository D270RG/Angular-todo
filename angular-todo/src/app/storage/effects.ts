import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as todoListActions from './actions.todoList';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { HttpModule } from 'src/app/http.service';

@Injectable()
export class TodoListEffects {
	public constructor(
		private httpModule: HttpModule,
		// eslint-disable-next-line
		private actions$: Actions<any> //Any aviable Action
	) {}
	public getData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(todoListActions.getData.type),
			tap(console.log),
			switchMap(() =>
				this.httpModule.getTodos().pipe(
					map((loadedData) =>
						todoListActions.getDataSuccess({ data: loadedData })
					),
					catchError((err) => of(todoListActions.getDataError(err)))
				)
			)
		)
	);

	public addEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(todoListActions.addEntry.type),
			switchMap((action) => {
				console.log('addEntry', action);
				return this.httpModule.createTodo(action.data).pipe(
					map((loadedData) =>
						todoListActions.addEntrySuccess({ data: loadedData })
					),
					catchError((err) => of(todoListActions.addEntryError({ error: err })))
				);
			})
		)
	);

	public updateEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(todoListActions.updateEntry.type),
			switchMap((action) =>
				this.httpModule.updateTodo(action.id, action.data).pipe(
					map((loadedData) =>
						todoListActions.updateEntrySuccess({ data: loadedData })
					),
					catchError((err) =>
						of(todoListActions.updateEntryError({ error: err }))
					)
				)
			)
		)
	);

	public deleteEntry$ = createEffect(() =>
		this.actions$.pipe(
			ofType(todoListActions.deleteEntry.type),
			switchMap((action) =>
				this.httpModule.deleteTodo(action.data.id).pipe(
					map(() =>
						todoListActions.deleteEntrySuccess({ data: action.data.id })
					),
					catchError((err) =>
						of(todoListActions.deleteEntryError({ error: err }))
					)
				)
			)
		)
	);
}
