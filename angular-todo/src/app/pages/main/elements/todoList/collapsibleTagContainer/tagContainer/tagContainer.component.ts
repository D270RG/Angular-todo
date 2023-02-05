import { Component, Input, OnInit } from '@angular/core';

interface renderedTag {
	text: string | undefined;
	color: string | undefined;
}
@Component({
	selector: 'tagContainer',
	templateUrl: 'tagContainer.component.html',
	styleUrls: ['./tagContainer.component.scss'],
})
export class TagContainer implements OnInit {
	@Input() public maxLength!: number;
	@Input() public tags!: string[];
	public renderedTags: renderedTag[];
	public unrenderedTags: string[];
	public constructor() {
		this.renderedTags = [];
		this.unrenderedTags = [];
	}
	public ngOnInit(): void {
		this.renderedTags = this.tags
			.slice(0, this.maxLength)
			.map((tag: string) => {
				return {
					text: tag.split('&').at(0),
					color: tag.split('&').at(-1),
				};
			});
		this.unrenderedTags = this.tags.slice(this.maxLength, this.tags.length);
	}
}
