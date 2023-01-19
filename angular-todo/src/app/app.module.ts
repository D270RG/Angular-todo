import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MainpageComponent } from './pages/main/mainpage.component';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from './storage/reducers';
import { MainpageModule } from './pages/main/mainpage.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MainpageModule,

    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({todo:todoReducer}),
    HttpClientModule,
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
