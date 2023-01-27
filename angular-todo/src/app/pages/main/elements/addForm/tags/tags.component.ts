import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'tags',
    template: `<div class="form-tag-container">
                    <div class="tag me-1 mb-1 ps-2" *ngFor="let tag of this.tags;let i = index">
                        {{tag}}
                        <button type="button" class="tag-button" (click)="this.emitDeleteTagEvent(i)"><i class="bi bi-x-lg"></i></button>
                    </div>
                </div>`,
    styleUrls:['../addForm.component.scss','./tags.component.scss']
})

export class TagsComponent implements OnInit {
    @Input() tags!:string[];
    @Output() deleteTagEvent:EventEmitter<any> = new EventEmitter();
    emitDeleteTagEvent(index:number){
        console.log('delete tag emit',index);
        this.deleteTagEvent.emit({index:index});
    }
    constructor() { }
    ngOnInit() { }
}