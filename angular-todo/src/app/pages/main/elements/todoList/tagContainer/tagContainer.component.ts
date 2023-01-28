import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "tagContainer",
  templateUrl: 'tagContainer.component.html',
  styleUrls: ['./tagContainer.component.scss'],
})
export class TagContainer implements OnInit {
  @Input() maxLength!: number;
  @Input() tags!: string[];
  constructor() {}
  ngOnInit() {
  }
}