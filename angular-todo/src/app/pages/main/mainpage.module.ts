import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageComponent } from './mainpage.component';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from '../../storage/reducers';
import { TodoListComponent } from './elements/todoList/todoList.component';
@NgModule({
    declarations: [
      MainpageComponent,
      TodoListComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,
      StoreModule.forRoot({todo:todoReducer}),
      HttpClientModule
    ],
    providers: [],
    bootstrap: [MainpageComponent]
  })
  export class MainpageModule {}