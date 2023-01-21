import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageComponent } from './mainpage.component';

import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from '../../storage/TodoListEffects';
import { TodoListComponent } from './elements/todoList/todoList.component';
import { StoreModule } from '@ngrx/store';
import { todoListReducer } from 'src/app/storage/reducers';
import { HttpService } from 'src/app/http.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
      MainpageComponent,
      TodoListComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,    
      EffectsModule.forFeature([TodoListEffects]),
      StoreModule.forRoot({todoList: todoListReducer}),
      HttpClientModule,
      StoreDevtoolsModule.instrument({})
    ],
    providers: [HttpService],
    bootstrap: [MainpageComponent]
  })
  export class MainpageModule {}