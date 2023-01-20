import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap,map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { todoPostForm } from '../types';

@Injectable()
export class TodoListEffects {
  serverUrl:string;
    urls:{
        getUrl:string,
        removeUrl:string,
        updateUrl:string,
        createUrl:string
    };

    constructor(private httpService: HttpService,private actions$: Actions) {  
        this.serverUrl = 'http://localhost:3000/api'
        this.urls = {
            getUrl:'get-garbages',
            removeUrl:'remove-garbage',
            updateUrl:'update-garbage',
            createUrl:'create-garbage'
        }
    };

    getData$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] GetData'),
      mergeMap(()=>
        this.httpService.getData(`${this.serverUrl}/${this.urls.getUrl}`)
        .pipe(
          map(data => ({ type: '[Todo Component] GetDataSuccess', payload: data })),
          catchError(() => of({ type: '[Todo Component] GetDataError' }))
        )
      )
    ));

    addEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] AddEntry'),
      switchMap((action:{data:todoPostForm})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}`,action.data)
        .pipe(
          map(() => ({ type: '[Todo Component] AddEntrySuccess' })),
          catchError(() => of({ type: '[Todo Component] AddEntryError' }))
        )
      )
    ));

    deleteEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] DeleteEntry'),
      switchMap((action:{id:string})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}/${action.id}`,undefined)
        .pipe(
          map(() => ({ type: '[Todo Component] DeleteEntrySuccess' })),
          catchError(() => of({ type: '[Todo Component] DeleteEntryError' }))
        )
      )
    ));

    updateEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] DeleteEntry'),
      switchMap((action:{id:string,data:string})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}/${action.id}`,action.data)
        .pipe(
          map(() => ({ type: '[Todo Component] UpdateEntrySuccess' })),
          catchError(() => of({ type: '[Todo Component] UpdateEntryError' }))
        )
      )
    ));
}