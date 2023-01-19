import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { todoListContent,todoListError } from 'src/app/types';

@Component({
    selector: 'todoList',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss'],
    providers: [HttpService]
})
export class TodoListComponent implements OnInit {
    serverUrl:string;
    urls:{
        getUrl:string,
        removeUrl:string,
        updateUrl:string,
        createUrl:string
    };
    constructor(private httpService: HttpService) {  
        this.serverUrl = 'http://localhost:3000/api'
        this.urls = {
            getUrl:'get-garbages',
            removeUrl:'remove-garbage',
            updateUrl:'update-garbage',
            createUrl:'create-garbage'
        }
    }
    ngOnInit(){ 
        console.log('get',`${this.serverUrl}/${this.urls.getUrl}`);
        this.httpService
          .getData(`${this.serverUrl}/${this.urls.getUrl}`)
          .subscribe({
            next: (data: any) => {
                console.log(data,typeof data);
            },
          });
    }
}