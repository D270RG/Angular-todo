import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { todoListContent,todoListError } from 'src/app/types';
import { Store } from '@ngrx/store';
import * as Actions from  'src/app/storage/TodoListActions';

@Component({
    selector: 'todoList',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss']
})
export class TodoListComponent implements OnInit {
    constructor(private store: Store) {
      this.store.dispatch(Actions.getData());
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