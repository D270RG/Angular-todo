import { Component } from '@angular/core';
import { EditFormComponent } from '../editForm/editForm.component';

@Component({
	selector: 'commentForm',
	templateUrl: 'commentForm.component.html',
	styleUrls: [
		'../addForm.component.scss',
		'../editForm/editForm.component.scss',
		'./commentForm.component.scss',
	],
})
export class CommentFormComponent extends EditFormComponent {}
