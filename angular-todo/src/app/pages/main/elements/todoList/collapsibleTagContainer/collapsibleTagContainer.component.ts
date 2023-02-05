import { Component, Input } from '@angular/core';

@Component({
	selector: 'collapsibleTagContainer',
	templateUrl: 'collapsibleTagContainer.component.html',
})
export class CollapsibleTagContainer {
	@Input() public tags!: string[];
	@Input() public initialLength!: number;
}
