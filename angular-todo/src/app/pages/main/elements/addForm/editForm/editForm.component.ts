import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers';
import * as Actions from 'src/app/storage/actions';
import { FormGroup } from '@angular/forms';
import { toString, AddFormComponent } from '../addForm.component';
import { ITodoElement } from 'src/app/types';
import * as Selectors from 'src/app/storage/selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'editForm',
	templateUrl: 'editForm.component.html',
	styleUrls: ['../addForm.component.scss', './editForm.component.scss'],
})
export class EditFormComponent extends AddFormComponent {
	private initialValueObservable$: Observable<ITodoElement | undefined>;
	private initialValueSubscription: Subscription;
	private initialValue: ITodoElement | undefined;
	public constructor(public override store: Store<RootState>) {
		super(store);
		this.initialValueObservable$ = this.store.pipe(
			select(Selectors.selectTodoById('0'))
		);
		this.initialValueSubscription = this.initialValueObservable$.subscribe(
			(initialValue: ITodoElement | undefined) => {
				this.initialValue = initialValue;
			}
		);
	}
	public resubscribe(id: string | undefined): void {
		console.log('resubscribe to', id);
		console.log('active id', this.activeId);
		if (id) {
			this.initialValueSubscription.unsubscribe();
			this.initialValueObservable$ = this.store.pipe(
				select(Selectors.selectTodoById(id))
			);
			this.initialValueSubscription = this.initialValueObservable$.subscribe(
				(initialValue: ITodoElement | undefined) => {
					this.initialValue = initialValue;
				}
			);
		}
	}
	public ngOnChanges(): void {
		if (this.activeId !== undefined) {
			this.resubscribe(this.activeId?.id);
			this.setMainGroup(this.editFormCreator());
		}
	}
	public override closeForm(event: Event): void {
		if (event instanceof KeyboardEvent) {
			if (event.keyCode === 27) {
				this.setMainGroup(this.editFormCreator());
				this.onClickboxClicked.emit();
			}
		} else {
			if (
				event instanceof MouseEvent ||
				event instanceof TouchEvent ||
				event instanceof PointerEvent
			) {
				event.stopPropagation();
				this.setMainGroup(this.editFormCreator());
				this.onClickboxClicked.emit();
			}
		}
	}
	public override ngOnInit(): void {
		this.setMainGroup(this.editFormCreator());
	}
	protected editFormCreator(): FormGroup {
		if (this.initialValue) {
			return this.formCreator(this.initialValue);
		} else {
			return this.formCreator({
				name: '',
				comment: '',
				link: '',
				tags: [],
			});
		}
	}
	protected override submitMainAction(): void {
		if (this.initialValue && this.activeId?.id)
			this.store.dispatch(
				Actions.updateEntry({
					id: this.activeId.id,
					data: {
						name: toString(this.getMainGroup().get('name')?.value),
						link: toString(this.getMainGroup().get('link')?.value),
						createdDate: this.initialValue.createdDate,
						updatedDate: new Date().toISOString(),
						comment: toString(this.getMainGroup().get('comment')?.value),
						tags: this.getMainGroup().get('tags')?.value,
					},
				})
			);
	}
}
