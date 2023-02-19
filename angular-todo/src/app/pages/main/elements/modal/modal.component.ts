import { Component, EventEmitter, Input, Output } from '@angular/core';
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
	@Output() public onClickboxClicked: EventEmitter<Event> = new EventEmitter();
	public constructor(public store: Store<RootState>) {}
	public formClick(event: MouseEvent | TouchEvent): void {
		event.stopPropagation();
	}
	public closeForm(): void {
		this.store.dispatch(modalActions.setFormType({ formType: 'none' }));
	}
}
