import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of,filter } from 'rxjs';
import { switchMap,map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { todoPostForm } from '../types';
import * as todoListActions from './TodoListActions'

@Injectable()
export class TodoListEffects {
  serverUrl:string;
    urls:{
        getUrl:string,
        removeUrl:string,
        updateUrl:string,
        createUrl:string
    };

    constructor(private httpService:HttpService,private actions$:Actions<any>) {  
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
          map(data => ({ type: '[Todo Component] OperationSuccess', payload:{data:data} })),
          catchError(() => of({ type: '[Todo Component] OperationError' }))
        )
      )
    ));

    addEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] AddEntry'),
      switchMap((action:{data:todoPostForm})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}`,action.data)
        .pipe(
          map(() => ({ type: '[Todo Component] OperationSuccess' })),
          catchError(() => of({ type: '[Todo Component] OperationError' }))
        )
      )
    ));
    deleteEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] DeleteEntry'),
      switchMap((action:{id:string})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}/${action.id}`,undefined)
        .pipe(
          map(() => ({ type: '[Todo Component] OperationSuccess' })),
          catchError(() => of({ type: '[Todo Component] OperationError' }))
        )
      )
    ));
    updateEntry$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] DeleteEntry'),
      switchMap((action:{id:string,data:string})=>
        this.httpService.postData(`${this.serverUrl}/${this.urls.createUrl}/${action.id}`,action.data)
        .pipe(
          map(() => ({ type: '[Todo Component] OperationSuccess' })),
          catchError(() => of({ type: '[Todo Component] OperationError' }))
        )
      )
    ));

    //forward fetch if updated
    operationSuccess$ = createEffect(() => this.actions$.pipe(
      ofType('[Todo Component] OperationSuccess'),
      map((action) => {
        if(action.payload){
          console.log('withPayload',action.payload)
          return({ type: '[Todo Component] WriteData',payload:{data:action.payload.data} })  
        } else {
          return({ type: '[Todo Component] GetData' })
        }
      })
    ))
}
