import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/storage/reducers.root';
import * as todoActions from 'src/app/storage/actions.todoList';
import * as modalActions from 'src/app/storage/actions.modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IModelTodoCreateForm } from 'src/app/types';
import { ETagDelete } from './tags/tags.component';

export function toString(value: number | string | Date): string {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value);
}

@Component({
	selector: 'addForm',
	templateUrl: 'addForm.component.html',
	styleUrls: ['addForm.component.scss'],
})
export class AddFormComponent implements OnInit {
	private mainGroup!: FormGroup;
	@Input() public activeId!: string;
	@Output() public onClickboxClicked: EventEmitter<Event> = new EventEmitter();

	public constructor(public store: Store<RootState>) {}
	public ngOnInit(): void {
		this.resetForm();
	}

	public getMainGroup(): FormGroup {
		return this.mainGroup;
	}
	public setMainGroup(formGroup: FormGroup): void {
		this.mainGroup = formGroup;
	}

	public resetForm(): void {
		this.mainGroup = this.formCreator({
			name: '',
			comment: '',
			link: '',
			tags: [],
		});
	}
	public deleteTag(event: ETagDelete): void {
		const tags = this.mainGroup.get('tags')?.value;
		if (tags) {
			const newTags = [...tags];
			newTags.splice(event.index, 1);
			this.mainGroup.controls['tags'].setValue(newTags);
		}
	}
	public submitMain(): void {
		if (this.mainGroup) {
			const nameErrors = this.mainGroup.get('name')?.errors;
			if (nameErrors !== null) {
				console.log(nameErrors);
				return;
			}
			this.onClickboxClicked.emit();
			this.submitMainAction();
			this.resetForm();
		}
	}
	public submitTag(): void {
		if (this.mainGroup) {
			const errors = this.mainGroup.get('tagsGroup.tagForm')?.errors;
			if (errors !== null) {
				console.log(errors);
				return;
			}
			this.submitTagAction();
		}
	}
	protected formCreator(initialValue: IModelTodoCreateForm): FormGroup {
		console.log('creating form', initialValue);
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
	protected submitMainAction(): void {
		this.store.dispatch(
			todoActions.addEntry({
				data: {
					name: toString(this.mainGroup.get('name')?.value),
					link: toString(this.mainGroup.get('link')?.value),
					comment: toString(this.mainGroup.get('comment')?.value),
					tags: this.mainGroup.get('tags')?.value,
				},
			})
		);
		this.store.dispatch(modalActions.setFormType({ formType: 'none' }));
	}
	private submitTagAction(): void {
		const currentTags = this.mainGroup.get('tags')?.value;
		if (currentTags !== null) {
			this.mainGroup.controls['tags'].setValue([
				...currentTags,
				this.mainGroup.get('tagsGroup.tagForm')?.value +
					'&' +
					this.mainGroup.get('tagsGroup.tagColor')?.value,
			]);
		}
	}
}
