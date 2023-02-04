import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from 'src/app/storage/actions';
import {
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { IModelTodoCreateForm } from 'src/app/types';

export function toString(value: any): string {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value);
}

@Component({
	selector: 'addForm',
	templateUrl: 'addForm.component.html',
	styleUrls: ['addForm.component.scss'],
	host: {
		'(document:keyup)': 'closeForm($event)',
	},
})
export class addFormComponent implements OnInit {
	mainGroup!: FormGroup<any>;
	@Input() initialValue!: IModelTodoCreateForm;
	@Input() visible!: boolean;
	@Output() onClickboxClicked: EventEmitter<any> = new EventEmitter();
	resetForm() {
		this.mainGroup = this.formCreator({
			name: '',
			comment: '',
			link: '',
			tags: [],
		});
	}
	closeForm(event?: any): void {
		if (event instanceof KeyboardEvent) {
			if (event.keyCode === 27) {
				this.onClickboxClicked.emit();
			}
		} else {
			if (
				event instanceof MouseEvent ||
				event instanceof TouchEvent ||
				event instanceof PointerEvent
			) {
				this.onClickboxClicked.emit();
			}
		}
	}
	deleteTag(event: any) {
		let newTags = [...this.mainGroup.get('tags')!.value];
		newTags.splice(event.index, 1);
		this.mainGroup.controls['tags'].setValue(newTags);
	}
	formClick(event: MouseEvent | TouchEvent) {
		event.stopPropagation();
	}
	constructor(public store: Store<typeof TodoListInitialState>) {}
	formCreator(initialValue: IModelTodoCreateForm) {
		return new FormGroup({
			name: new FormControl(initialValue.name, [
				Validators.required,
				Validators.minLength(3),
			]),
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
	submitMainAction() {
		this.store.dispatch(
			Actions.addEntry({
				data: {
					name: toString(this.mainGroup.get('name')!.value),
					link: toString(this.mainGroup.get('link')!.value),
					comment: toString(this.mainGroup.get('comment')!.value),
					tags: this.mainGroup.get('tags')!.value,
				},
			})
		);
	}
	submitMain() {
		if (this.mainGroup) {
			let nameErrors = this.mainGroup.get('name')!.errors;
			if (nameErrors !== null) {
				console.log(nameErrors);
				return;
			}
			this.onClickboxClicked.emit();
			this.submitMainAction();
			this.resetForm();
		}
	}

	submitTagAction() {
		this.mainGroup.controls['tags'].setValue([
			...this.mainGroup.get('tags')!.value,
			this.mainGroup.get('tagsGroup.tagForm')!.value +
				'&' +
				this.mainGroup.get('tagsGroup.tagColor')!.value,
		]);
	}
	submitTag() {
		if (this.mainGroup) {
			let errors = this.mainGroup.get('tagsGroup.tagForm')!.errors;
			if (errors !== null) {
				console.log(errors);
				return;
			}
			this.submitTagAction();
		}
	}

	ngOnInit() {
		this.resetForm();
	}
}
