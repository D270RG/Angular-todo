import { Component, OnInit } from '@angular/core';
import { ITodoElement } from 'src/app/types';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import * as todoSelectors from 'src/app/storage/selectors.todoList';
import * as todoActions from 'src/app/storage/actions.todoList';
import * as modalActions from 'src/app/storage/actions.modal';
import { Subscription } from 'rxjs';

@Component({
	selector: 'todoList',
	templateUrl: 'todoList.component.html',
	styleUrls: ['todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
	private todoListData = <ITodoElement[]>[];

	public todoListDataObservable$;

	private subscriptions: Subscription[];

	public constructor(private store: Store<RootState>) {
		this.subscriptions = [];
		this.todoListDataObservable$ = this.store.pipe(
			select(todoSelectors.selectSortedTodoList)
		);
	}
	public openEditForm(formId: string): void {
		this.store.dispatch(
			modalActions.setForm({ formId: formId, formType: 'edit' })
		);
	}
	public openCommentForm(formId: string): void {
		this.store.dispatch(
			modalActions.setForm({ formId: formId, formType: 'comment' })
		);
	}
	public getTodoListData(): ITodoElement[] {
		return this.todoListData;
	}
	public deleteForm(id: string): void {
		this.store.dispatch(todoActions.deleteEntry({ data: { id: id } }));
	}
	public preventFalltrough(event: MouseEvent): void {
		event.stopPropagation();
	}
	public ngOnInit(): void {
		this.subscriptions.push(
			this.todoListDataObservable$.subscribe((todoListData: ITodoElement[]) => {
				this.todoListData = todoListData;
			})
		);

		this.store.dispatch(todoActions.getData());
	}
	public ngOnDestroy(): void {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
