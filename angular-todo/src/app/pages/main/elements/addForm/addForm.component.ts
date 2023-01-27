import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListInitialState } from 'src/app/storage/reducers';
import * as Actions from  'src/app/storage/actions';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { todoCreateForm, todoUpdateForm} from 'src/app/types';

export function toString(value:any):string{
    if(value===null||value===undefined){
        return('');
    }
    return(String(value));
}
export class TapValidationErrors{
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
    checkError(name:string,error:'required'|'minlength'|'maxlength'){
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
    mainGroup!: FormGroup<any>;
    errors:TapValidationErrors;
    @Input() initialValue!:todoCreateForm;
    @Input() visible!:boolean;
    @Output() onClickboxClicked: EventEmitter<any> = new EventEmitter();

    emitClickboxEvent(event?:KeyboardEvent|MouseEvent|TouchEvent): void {
        if(event instanceof KeyboardEvent){
            if(event.key==='esc'){
                this.onClickboxClicked.emit();
                this.errors.clearErrors();
            }
        } else {
            if(event instanceof MouseEvent || event instanceof TouchEvent){
                this.onClickboxClicked.emit();
                this.errors.clearErrors();
            }
        }
    }
    deleteTag(event:any){
        let newTags = [...this.mainGroup.get('tags')!.value];
        newTags.splice(event.index,1);
        this.mainGroup.controls['tags'].setValue(newTags);
    }
    formClick(event:MouseEvent|TouchEvent){
        event.stopPropagation();
        console.log('form clicked');
    }
    constructor(public store: Store<typeof TodoListInitialState>) { 
        this.errors = new TapValidationErrors();
    }
    formCreator(initialValue:todoCreateForm){
        return new FormGroup({
            name: new FormControl(initialValue.name,
                [Validators.required,
                 Validators.minLength(3)]),
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
    submitMainAction(){
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
    submitMain(){
        if(this.mainGroup){
            let nameErrors = this.mainGroup.get('name')!.errors;
            if(nameErrors!==null) {
                console.log(nameErrors);
                this.errors.setErrors('name',nameErrors);
                return;
              }
            this.onClickboxClicked.emit();
            console.log('sending',this.mainGroup.get('name')!.value);
            this.submitMainAction();
        }
    }

    submitTagAction(){
        this.mainGroup.controls['tags'].setValue([...this.mainGroup.get('tags')!.value,this.mainGroup.get('tagsGroup.tagForm')!.value]);
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
            this.submitTagAction();
        }
    }

    ngOnInit() {   
        this.mainGroup = this.formCreator({name:'',comment:'',link:'',tags:[]});
    }
}