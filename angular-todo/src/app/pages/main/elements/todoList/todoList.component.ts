import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { todoListContent,todoListError } from 'src/app/types';
import { createSelector, select, Store } from '@ngrx/store';
import * as Actions from  'src/app/storage/TodoListActions';
import { initialState,State } from 'src/app/storage/reducers';

@Component({
    selector: 'todoList',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss']
})
export class TodoListComponent implements OnInit {
  
    selectData = (state:State) => state.todoList; //todo:move to selectors
    selectById = (id:string)=>createSelector(this.selectData,(data)=>{
      return(data)
    })

    todoListDataObservable$ = this.store.pipe(select(this.selectData));
    todoListData = undefined as todoListContent|undefined;

    constructor(private store: Store<typeof initialState>) {
      //@ts-ignore
      this.todoListDataObservable$.subscribe((todoListData:todoListContent|undefined)=>{this.todoListData = todoListData.todoList});
      this.store.dispatch(Actions.getData({payload:{message:'message'}}));
    }
    ngOnInit(){ 
      // console.log('get',`${this.serverUrl}/${this.urls.getUrl}`);
      // this.httpService
      //   .getData(`${this.serverUrl}/${this.urls.getUrl}`)
      //   .subscribe({
      //     next: (data: any) => {
      //         console.log(data,typeof data);
      //     },
      //   });
    }
}