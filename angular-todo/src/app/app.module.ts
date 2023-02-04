import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './storage/effects';
import { StoreModule } from '@ngrx/store';
import { HttpModule, HttpService } from './http.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoListReducer } from './storage/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from './pages/main/mainpage.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { TodoListComponent } from './pages/main/elements/todoList/todoList.component';
import { TagContainer } from './pages/main/elements/todoList/tagContainer/tagContainer.component';
import { addFormComponent } from './pages/main/elements/addForm/addForm.component';
import { editFormComponent } from './pages/main/elements/addForm/editForm/editForm.component';
import { TagsComponent } from './pages/main/elements/addForm/tags/tags.component';

@NgModule({
	declarations: [
		AppComponent,

		MainpageComponent,
		NotFoundComponent,

		TodoListComponent,
		TagContainer,
		TagsComponent,
		addFormComponent,
		editFormComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,

		HttpClientModule,
		EffectsModule.forRoot([TodoListEffects]),
		StoreModule.forRoot({ todoListState: todoListReducer }),
		StoreDevtoolsModule.instrument({}),

		FormsModule,
		ReactiveFormsModule,
	],
	providers: [HttpModule, HttpService],
	bootstrap: [AppComponent],
})
export class AppModule {}
