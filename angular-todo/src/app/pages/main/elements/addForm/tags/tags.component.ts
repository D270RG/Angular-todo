import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//tag container for in-form view
@Component({
	selector: 'tags',
	template: `<div class="form-tag-container">
		<div
			[ngStyle]="{ background: tag.split('&').at(-1) }"
			class="tag"
			*ngFor="let tag of this.tags; let i = index">
			{{ tag.split('&').at(0) }}
			<button
				type="button"
				class="tag-button"
				(click)="this.emitDeleteTagEvent(i)">
				<i class="bi bi-x-lg"></i>
			</button>
		</div>
	</div>`,
	styleUrls: ['../addForm.component.scss', './tags.component.scss'],
})
export class TagsComponent implements OnInit {
	@Input() tags!: string[];
	@Output() deleteTagEvent: EventEmitter<any> = new EventEmitter();
	emitDeleteTagEvent(index: number) {
		console.log('delete tag emit', index);
		this.deleteTagEvent.emit({ index: index });
	}
	constructor() {}
	ngOnInit() {}
}
