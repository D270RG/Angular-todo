import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from  'src/app/storage/actions';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { todoPostForm } from 'src/app/types';

function toString(value:any):string{
    if(value===null||value===undefined){
        return('');
    }
    return(String(value));
}
class TapValidationErrors{
    errors:{[key:string]:ValidationErrors|null};
    constructor(){
        this.errors = {};
    }
    setErrors(name:string,errors:ValidationErrors|null){
        console.log('set errors',errors,name);
        this.errors[name] = {...errors};
    }
    checkErrors(name:string){
        console.log('check errors',this.errors[name],name);
        return(this.errors[name] !== null && this.errors[name] !== undefined);
    }
    checkError(name:string,error:'required'|'minlength'){
        return(this.errors[name] && this.errors[name] !== null && this.errors[name]!.hasOwnProperty(error));
    }
    clearErrors(name?:string){
        console.log('clean errors');
        if(name){
            delete this.errors[name];
        } else {
            this.errors = {};
        }
    }
}

@Component({
    selector: 'addForm',
    templateUrl: 'addForm.component.html',
    styleUrls: ['addForm.component.scss']
})
export class addFormComponent implements OnInit {
    mainGroup: FormGroup<any>;
    errors:TapValidationErrors;
    @Input() initialValue:todoPostForm|undefined;
    @Input() visible!:boolean;
    @Output() onClickboxClicked: EventEmitter<any> = new EventEmitter();

    emitClickboxEvent(event?:KeyboardEvent|MouseEvent|TouchEvent): void {
        if(event instanceof KeyboardEvent){
            if(event.key==='esc') this.onClickboxClicked.emit();
        } else {
            this.onClickboxClicked.emit();
        }
        this.errors.clearErrors();
    }
    formClick(event:MouseEvent|TouchEvent){
        event.stopPropagation();
        console.log('form clicked');
    }
    constructor(private store: Store<typeof TodoListInitialState>) { 
        this.errors = new TapValidationErrors();
        if(this.initialValue){
            this.mainGroup = this.formCreator(this.initialValue);
        } else {
            this.mainGroup = this.formCreator({name:'',comment:'',link:'',tags:[]});
        }
    }
    formCreator(initialValue:todoPostForm){
        return new FormGroup({
            name: new FormControl(initialValue.name,
                [Validators.required,
                 Validators.minLength(3)]),
            comment: new FormControl(initialValue.comment),
            link: new FormControl(initialValue.link),
            tags: new FormControl(initialValue.tags),

            tagsGroup: new FormGroup({
              tagForm: new FormControl(null,[Validators.required,
                                            Validators.minLength(1)]),
            }),
        })
    }
    submitMain(){
        if(this.mainGroup){
            let nameErrors = this.mainGroup.get('name')!.errors;
            if(nameErrors!==null) {
                console.log(nameErrors);
                this.errors.setErrors('name',nameErrors);
                return;
              }
            this.emitClickboxEvent();
            console.log('sending',this.mainGroup.get('name')!.value);
            this.store.dispatch(
                Actions.addEntry(
                    {
                        payload:
                        {
                            data:{
                                name:toString(this.mainGroup.get('name')!.value),
                                link:toString(this.mainGroup.get('link')!.value),
                                comment:toString(this.mainGroup.get('comment')!.value),
                                tags:this.mainGroup.get('tags')!.value
                            }
                        }
                    }
                )
            );
        }
    }
    submitTag(){
        if(this.mainGroup){
            let errors = this.mainGroup.get('tagsGroup.tagForm')!.errors;
            if(errors!==null) {
                console.log(errors);
                this.errors.setErrors('tags',errors);
                return;
              }
            this.errors.clearErrors('tags');
            this.mainGroup.controls['tags'].setValue([...this.mainGroup.get('tags')!.value,this.mainGroup.get('tagsGroup.tagForm')!.value]);
        }
    }

    ngOnInit() {   

    }
}