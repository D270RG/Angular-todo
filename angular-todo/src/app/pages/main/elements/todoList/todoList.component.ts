import { Component, OnInit } from '@angular/core';
import { IActiveSortData, ISortData, ITodoElement } from 'src/app/types';
import { select, Store } from '@ngrx/store';
import * as Actions from 'src/app/storage/actions';
import * as Selectors from 'src/app/storage/selectors';
import { RootState } from 'src/app/storage/reducers';
import { tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'todoList',
	templateUrl: 'todoList.component.html',
	styleUrls: ['todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
	public todoListData = <ITodoElement[]>[];
	public formVisible: string;

	//--Sort form controls--
	public sortGroup!: FormGroup;
	public sortGroupOptions: {
		field: Record<IActiveSortData['field'], string | undefined>;
		direction: Record<IActiveSortData['direction'], string | undefined>;
	};
	public sortGroupDefault: {
		field: ISortData['field'];
		direction: ISortData['direction'];
	};
	protected sortFormCreator(initialValue: ISortData): FormGroup {
		return new FormGroup({
			field: new FormControl(initialValue.field),
			direction: new FormControl(initialValue.direction),
		});
	}
	protected submitSortAction(): void {
		this.store.dispatch(
			Actions.setSortData({
				sortData: {
					field: this.sortGroup.get('field')?.value,
					direction: this.sortGroup.get('direction')?.value,
				},
			})
		);
	}
	//---------------------

	public constructor(private store: Store<RootState>) {
		this.formVisible = 'none';

		this.todoListDataObservable$.subscribe((todoListData: ITodoElement[]) => {
			this.todoListData = todoListData;
		});

		//--Sort form initializer--
		this.sortGroupOptions = {
			field: {
				name: 'Name',
				createdDate: 'CreatedDate',
				updatedDate: 'UpdatedDate',
				tags: 'Tags',
			},
			direction: {
				asc: 'Ascending',
				desc: 'Descending',
			},
		};
		this.sortGroupDefault = {
			field: 'createdDate',
			direction: 'asc',
		};
		this.sortGroup = this.sortFormCreator({
			field: this.sortGroupDefault.field,
			direction: this.sortGroupDefault.direction,
		});
		//---------------------
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
	private todoListDataObservable$ = this.store.pipe(
		tap(console.log),
		select(Selectors.selectSortedTodoList)
	);
}
