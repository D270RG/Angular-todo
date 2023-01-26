import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageModule } from './pages/main/mainpage.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './storage/effects';
import { StoreModule } from '@ngrx/store';
import { HttpService } from './http.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { sortReducer, todoListReducer } from './storage/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MainpageModule,

    BrowserModule,
    AppRoutingModule,
    NgbModule,

    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({todoListReducer: todoListReducer,sortReducer: sortReducer}),
    StoreDevtoolsModule.instrument({}),

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
