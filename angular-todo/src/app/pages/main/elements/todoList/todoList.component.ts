import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { todoListContent,todoListError } from 'src/app/types';
import { createSelector, select, Store } from '@ngrx/store';
import * as Actions from  'src/app/storage/actions';
import { TodoListInitialState } from 'src/app/storage/reducers';

import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
    selector: 'todoList',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss']
})
export class TodoListComponent implements OnInit {
  
    selectData = (state:any) => {console.log('selectData',state.todoListReducer.todoList);return(state.todoListReducer.todoList)}; //todo:move to selectors
    
    todoListDataObservable$ = this.store.pipe(select(this.selectData));
    todoListData = undefined as todoListContent|undefined;

    formVisible:string;
    setFormVisible(value:string){
      this.formVisible = value;
    }
    preventFalltrough(event:MouseEvent){
      event.stopPropagation();
      console.log('stop propagation');
    }

    constructor(private store: Store<typeof TodoListInitialState>) {
      this.formVisible = 'none';
      this.todoListDataObservable$.subscribe((todoListData:todoListContent|undefined)=>{
        if(todoListData){
          console.log('binding',todoListData);
          this.todoListData = todoListData;
        }
      });
      console.log('CONSTRUCTOR');
      this.store.dispatch(Actions.getData());
    }
    
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    onSort({ sortColumn, sortDirection }: SortEvent) {
      // resetting other headers
      this.headers.forEach((header) => {
        if (header.sortable !== sortColumn) {
          header.direction = '';
        }
      });
  
      // execute sort 
      console.log('executing sort',{data:this.todoListData,sortColumn:sortColumn,sortDirection:sortDirection});
      this.store.dispatch(Actions.writeSortedData({payload:{data:this.todoListData,sortColumn:sortColumn,sortDirection:sortDirection}}));
    }

    ngOnInit(){ 
    
    }
}