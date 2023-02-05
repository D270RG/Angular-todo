import { Component, Input } from '@angular/core';

//tag container for TODO list view
@Component({
	selector: 'tagContainer',
	templateUrl: 'tagContainer.component.html',
	styleUrls: ['./tagContainer.component.scss'],
})
export class TagContainer {
	@Input() public maxLength!: number;
	@Input() public tags!: string[];
}
