import { Component, Input, OnInit } from '@angular/core';

//tag container for TODO list view
@Component({
	selector: 'tagContainer',
	templateUrl: 'tagContainer.component.html',
	styleUrls: ['./tagContainer.component.scss'],
})
export class TagContainer implements OnInit {
	@Input() maxLength!: number;
	@Input() tags!: string[];
	constructor() {}
	ngOnInit() {}
}
