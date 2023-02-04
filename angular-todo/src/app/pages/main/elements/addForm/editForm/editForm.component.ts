import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from 'src/app/storage/actions';
import {
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { toString, addFormComponent } from '../addForm.component';
import { IModelTodoUpdateForm } from 'src/app/types';

@Component({
	selector: 'editForm',
	templateUrl: 'editForm.component.html',
	styleUrls: ['../addForm.component.scss', './editForm.component.scss'],
})
export class editFormComponent extends addFormComponent {
	@Input() id!: string;
	@Input() override initialValue!: IModelTodoUpdateForm;
	constructor(public override store: Store<typeof TodoListInitialState>) {
		super(store);
	}
	override formCreator(initialValue: IModelTodoUpdateForm) {
		return new FormGroup({
			name: new FormControl(initialValue.name, [Validators.minLength(3)]),
			comment: new FormControl(initialValue.comment),
			link: new FormControl(initialValue.link),
			tags: new FormControl(initialValue.tags),

			tagsGroup: new FormGroup({
				tagForm: new FormControl(null, [
					Validators.required,
					Validators.minLength(1),
					Validators.maxLength(64),
				]),
				tagColor: new FormControl('#343a40'),
			}),
		});
	}
	override closeForm(event?: any): void {
		console.log('close Form', event);
		if (event instanceof KeyboardEvent) {
			if (event.keyCode === 27) {
				this.onClickboxClicked.emit();
				this.mainGroup = this.formCreator(this.initialValue);
			}
		} else {
			if (
				event instanceof MouseEvent ||
				event instanceof TouchEvent ||
				event instanceof PointerEvent
			)
				this.onClickboxClicked.emit();
			this.mainGroup = this.formCreator(this.initialValue);
		}
	}
	override submitMainAction() {
		console.log('sending update', this.id, {
			name: toString(this.mainGroup.get('name')!.value),
			link: toString(this.mainGroup.get('link')!.value),
			comment: toString(this.mainGroup.get('comment')!.value),
			tags: this.mainGroup.get('tags')!.value,
		});
		this.store.dispatch(
			Actions.updateEntry({
				id: this.id,
				data: {
					name: toString(this.mainGroup.get('name')!.value),
					link: toString(this.mainGroup.get('link')!.value),
					createdDate: this.initialValue.createdDate,
					updatedDate: new Date().toISOString(),
					comment: toString(this.mainGroup.get('comment')!.value),
					tags: this.mainGroup.get('tags')!.value,
				},
			})
		);
	}
	override ngOnInit(): void {
		this.mainGroup = this.formCreator(this.initialValue);
	}
}
