import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from 'src/app/storage/actions';
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
	host: {
		'(document:keyup)': 'closeForm($event)',
	},
})
export class AddFormComponent implements OnInit {
	public mainGroup!: FormGroup;
	@Input() public initialValue!: IModelTodoCreateForm;
	@Input() public visible!: boolean;
	@Output() public onClickboxClicked: EventEmitter<Event> = new EventEmitter();
	public resetForm(): void {
		this.mainGroup = this.formCreator({
			name: '',
			comment: '',
			link: '',
			tags: [],
		});
	}

	public closeForm(event: Event): void {
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
	public deleteTag(event: ETagDelete): void {
		const tags = this.mainGroup.get('tags')?.value;
		if (tags) {
			const newTags = [...tags];
			newTags.splice(event.index, 1);
			this.mainGroup.controls['tags'].setValue(newTags);
		}
	}
	public formClick(event: MouseEvent | TouchEvent): void {
		event.stopPropagation();
	}
	public constructor(public store: Store<typeof TodoListInitialState>) {}
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
	public ngOnInit(): void {
		this.resetForm();
	}

	protected formCreator(initialValue: IModelTodoCreateForm): FormGroup {
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
			Actions.addEntry({
				data: {
					name: toString(this.mainGroup.get('name')?.value),
					link: toString(this.mainGroup.get('link')?.value),
					comment: toString(this.mainGroup.get('comment')?.value),
					tags: this.mainGroup.get('tags')?.value,
				},
			})
		);
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
