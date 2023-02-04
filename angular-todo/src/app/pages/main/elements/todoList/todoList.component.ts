import { Component, OnInit } from '@angular/core';
import { ITodoElement } from 'src/app/types';
import { select, Store } from '@ngrx/store';
import * as Actions from 'src/app/storage/actions';
import * as Selectors from 'src/app/storage/selectors';
import { RootState } from 'src/app/storage/reducers';
import { tap } from 'rxjs';

@Component({
	selector: 'todoList',
	templateUrl: 'todoList.component.html',
	styleUrls: ['todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
	public todoListData = <ITodoElement[]>[];
	public formVisible: string;
	private todoListDataObservable$ = this.store.pipe(
		tap(console.log),
		select(Selectors.selectTodoValues)
	);

	public constructor(private store: Store<RootState>) {
		this.formVisible = 'none';
		this.todoListDataObservable$.subscribe((todoListData: ITodoElement[]) => {
			this.todoListData = todoListData;
		});
	}
	public setFormVisible(value: string): void {
		this.formVisible = value;
	}
	public deleteForm(id: string): void {
		this.store.dispatch(Actions.deleteEntry({ data: { id: id } }));
	}
	public preventFalltrough(event: MouseEvent): void {
		event.stopPropagation();
	}
	public ngOnInit(): void {
		this.store.dispatch(Actions.getData());
	}
}
