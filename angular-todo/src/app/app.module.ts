import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageModule } from './pages/main/mainpage.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './storage/TodoListEffects';
import { StoreModule } from '@ngrx/store';
import { HttpService } from './http.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoListReducer } from './storage/reducers';

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
    StoreModule.forRoot({todoList: todoListReducer}),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
