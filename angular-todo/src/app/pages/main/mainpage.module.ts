import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageComponent } from './mainpage.component';

import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from '../../storage/effects';
import { TodoListComponent } from './elements/todoList/todoList.component';

@NgModule({
    declarations: [
      MainpageComponent,
      TodoListComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,    
      EffectsModule.forFeature([TodoListEffects]),
      HttpClientModule
    ],
    providers: [],
    bootstrap: [MainpageComponent]
  })
  export class MainpageModule {}