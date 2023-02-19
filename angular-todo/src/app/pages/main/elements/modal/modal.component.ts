import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import * as modalActions from 'src/app/storage/actions.modal';
import { FormType } from 'src/app/types';
export function toString(value: number | string | Date): string {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value);
}

@Component({
	selector: 'modal',
	templateUrl: 'modal.component.html',
	styleUrls: ['modal.component.scss'],
})
export class ModalComponent {
	@Input() public formData!: {
		type: FormType;
		id: string;
	};
	public locAlias: Map<FormType, string>;

	public constructor(public store: Store<RootState>) {
		this.locAlias = new Map([
			['add', 'Add TODO'],
			['edit', 'Edit TODO'],
			['comment', 'Comment'],
		]);
	}
	public formClick(event: MouseEvent | TouchEvent): void {
		event.stopPropagation();
	}
	public closeForm(): void {
		this.store.dispatch(modalActions.setFormType({ formType: 'none' }));
	}
}
