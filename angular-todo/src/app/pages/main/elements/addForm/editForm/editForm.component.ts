import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from  'src/app/storage/actions';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { todoCreateForm,todoUpdateForm } from 'src/app/types';
import {TapValidationErrors,toString,addFormComponent} from '../addForm.component'

@Component({
    selector: 'editForm',
    templateUrl: 'editForm.component.html',
    styleUrls: ['../addForm.component.scss']
})
export class editFormComponent extends addFormComponent {
    @Input() id!:string;
    @Input() override initialValue!:todoUpdateForm;
    constructor(public override store: Store<typeof TodoListInitialState>) { 
        super(store);
        this.errors = new TapValidationErrors();
    }
    override formCreator(initialValue:todoUpdateForm){
        return new FormGroup({
            name: new FormControl(initialValue.name,
                [Validators.minLength(3)]),
            comment: new FormControl(initialValue.comment),
            link: new FormControl(initialValue.link),
            tags: new FormControl(initialValue.tags),

            tagsGroup: new FormGroup({
              tagForm: new FormControl(null,[Validators.required,
                                            Validators.minLength(1),
                                            Validators.maxLength(64)]),
            }),
        })
    }
    override emitClickboxEvent(event?:KeyboardEvent|MouseEvent|TouchEvent): void {
        if(event instanceof KeyboardEvent){
            if(event.key==='esc') this.onClickboxClicked.emit();
        } else {
            this.onClickboxClicked.emit();
        }
        this.errors.clearErrors();
        this.mainGroup = this.formCreator(this.initialValue);
    }
    override submitMainAction(){
        console.log('sending update',this.id, {
            name:toString(this.mainGroup.get('name')!.value),
            link:toString(this.mainGroup.get('link')!.value),
            comment:toString(this.mainGroup.get('comment')!.value),
            tags:this.mainGroup.get('tags')!.value
        });
        this.store.dispatch(
            Actions.updateEntry(
                {
                    payload:
                    {
                        id:this.id,
                        data:{
                            name:toString(this.mainGroup.get('name')!.value),
                            link:toString(this.mainGroup.get('link')!.value),
                            createdDate:this.initialValue.createdDate,
                            updatedDate:this.initialValue.updatedDate,
                            comment:toString(this.mainGroup.get('comment')!.value),
                            tags:this.mainGroup.get('tags')!.value
                        }
                    }
                }
            )
        );
    }
    override ngOnInit(): void {
        this.mainGroup = this.formCreator(this.initialValue);
    }
}