import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainpageComponent } from './pages/main/mainpage.component';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from './storage/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({todo:todoReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
