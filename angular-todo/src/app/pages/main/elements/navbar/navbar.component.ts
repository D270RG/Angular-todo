import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import * as modalActions from 'src/app/storage/actions.modal';
@Component({
	selector: 'navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Output() public onComponentAdditionRequested: EventEmitter<Event> =
		new EventEmitter();
	public constructor(private store: Store<RootState>) {}
	public openAddForm(): void {
		this.store.dispatch(modalActions.setFormType({ formType: 'add' }));
	}
}
