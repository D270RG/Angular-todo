import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageComponent } from './mainpage.component';

import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from '../../storage/effects';
import { TodoListComponent } from './elements/todoList/todoList.component';
import { StoreModule } from '@ngrx/store';
import { sortReducer, todoListReducer } from 'src/app/storage/reducers';
import { HttpService } from 'src/app/http.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { NgbdSortableHeader,SortEvent } from './elements/todoList/sortable.directive';
import { addFormComponent } from './elements/addForm/addForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { editFormComponent } from './elements/addForm/editForm/editForm.component';
import { TagsComponent } from './elements/addForm/tags/tags.component';

@NgModule({
    declarations: [
      MainpageComponent,
      TodoListComponent,
      addFormComponent,
      editFormComponent,
      TagsComponent
    ],
    imports: [
      BrowserModule,
      NgbModule,    
      EffectsModule.forFeature([TodoListEffects]),
      StoreModule.forRoot({todoListReducer: todoListReducer,sortReducer: sortReducer}),
      HttpClientModule,
      StoreDevtoolsModule.instrument({}),

      DecimalPipe, 
      NgFor, 
      NgbdSortableHeader,

      FormsModule,
      ReactiveFormsModule
    ],
    providers: [HttpService,DecimalPipe],
    bootstrap: [MainpageComponent]
  })
  export class MainpageModule {}