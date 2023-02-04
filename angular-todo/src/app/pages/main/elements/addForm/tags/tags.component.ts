import { Component, EventEmitter, Input, Output } from '@angular/core';

//tag container for in-form view
export interface ETagDelete {
	index: number;
}
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
export class TagsComponent {
	@Input() public tags!: string[];
	@Output() public deleteTagEvent: EventEmitter<ETagDelete> =
		new EventEmitter();
	public emitDeleteTagEvent(index: number): void {
		this.deleteTagEvent.emit({ index: index });
	}
}
