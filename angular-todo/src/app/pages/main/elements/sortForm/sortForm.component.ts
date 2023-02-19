import { Component } from '@angular/core';
import { IActiveSortData, ISortData } from 'src/app/types';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import { FormControl, FormGroup } from '@angular/forms';
import * as todoActions from 'src/app/storage/actions.todoList';
@Component({
	selector: 'sortForm',
	templateUrl: 'sortForm.component.html',
	styleUrls: ['sortForm.component.scss'],
})
export class SortFormComponent {
	public sortGroup!: FormGroup;
	public sortGroupOptions: {
		field: Record<IActiveSortData['field'], string | undefined>;
		direction: Record<IActiveSortData['direction'], string | undefined>;
	};
	public sortGroupDefault: {
		field: ISortData['field'];
		direction: ISortData['direction'];
	};
	public constructor(private store: Store<RootState>) {
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
	}

	protected sortFormCreator(initialValue: ISortData): FormGroup {
		return new FormGroup({
			field: new FormControl(initialValue.field),
			direction: new FormControl(initialValue.direction),
		});
	}
	protected submitSortAction(): void {
		this.store.dispatch(
			todoActions.setSortData({
				sortData: {
					field: this.sortGroup.get('field')?.value,
					direction: this.sortGroup.get('direction')?.value,
				},
			})
		);
	}
}
