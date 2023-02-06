import { Component, Input, OnInit } from '@angular/core';
import { formVisibility, ITodoElement } from 'src/app/types';
import { select, Store } from '@ngrx/store';
import * as Actions from 'src/app/storage/actions';
import * as Selectors from 'src/app/storage/selectors';
import { RootState } from 'src/app/storage/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'todoList',
	templateUrl: 'todoList.component.html',
	styleUrls: ['todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
	private todoListData = <ITodoElement[]>[];
	private activeForm: formVisibility;

	@Input() public externalFormOpen!: Observable<void>;
	public todoListDataObservable$;

	private subscriptions: Subscription[];

	public constructor(private store: Store<RootState>) {
		this.activeForm = undefined;
		this.subscriptions = [];
		this.todoListDataObservable$ = this.store.pipe(
			select(Selectors.selectSortedTodoList)
		);
	}
	public getTodoListData(): ITodoElement[] {
		return this.todoListData;
	}
	public getFormVisibility(): formVisibility {
		return this.activeForm;
	}
	public setFormVisible(value: formVisibility): void {
		console.log('setting form visibility', value);
		this.activeForm = value;
	}
	public getActiveForm(): formVisibility {
		return this.activeForm;
	}

	public deleteForm(id: string): void {
		this.store.dispatch(Actions.deleteEntry({ data: { id: id } }));
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
		this.subscriptions.push(
			this.externalFormOpen.subscribe(() =>
				this.setFormVisible({ id: undefined, type: 'add' })
			)
		);

		this.store.dispatch(Actions.getData());
	}
	public ngOnDestroy(): void {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
