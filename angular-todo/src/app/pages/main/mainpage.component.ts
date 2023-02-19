import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import * as modalActions from 'src/app/storage/actions.modal';
import { Subscription } from 'rxjs';
import { selectForm } from 'src/app/storage/selectors.modal';
import { FormType } from 'src/app/types';

@Component({
	selector: 'page-main',
	templateUrl: 'mainpage.component.html',
	styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent {
	private subscriptions: Subscription[];
	public activeForm: {
		id: string;
		type: FormType;
	};
	public constructor(private store: Store<RootState>) {
		this.activeForm = {
			id: '',
			type: 'none',
		};
		this.subscriptions = [];
	}
	public openAddForm(): void {
		this.store.dispatch(modalActions.setFormType({ formType: 'add' }));
	}

	public ngOnInit(): void {
		this.subscriptions.push(
			this.store.select(selectForm).subscribe((form) => {
				console.log('changed form', form);
				this.activeForm.id = form.formId;
				this.activeForm.type = form.formType;
			})
		);
	}
	public ngOnDestroy(): void {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
