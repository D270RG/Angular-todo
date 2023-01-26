import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of,filter,withLatestFrom } from 'rxjs';
import { switchMap,map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { todoListContent, todoCreateForm,todoUpdateForm} from '../types';

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
@Injectable()
export class TodoListEffects {
  serverUrl: string;
  urls: {
    getUrl: string;
    removeUrl: string;
    updateUrl: string;
    createUrl: string;
  };

  constructor(
    private httpService: HttpService,
    private actions$: Actions<any>,
    private store$: Store<any>
  ) {
    this.serverUrl = 'http://localhost:3000/api';
    this.urls = {
      getUrl: 'get-garbages',
      removeUrl: 'remove-garbage',
      updateUrl: 'update-garbage',
      createUrl: 'create-garbage',
    };
  }
  getData$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo Component] GetData'),
      withLatestFrom(this.store$.select(sortParametersSelector)),
      switchMap(([action, sortParams]) =>
        this.httpService
          .getData<todoListContent>(`${this.serverUrl}/${this.urls.getUrl}`)
          .pipe(
            map((loadedData) => {
              console.log('loaded', loadedData);
              return {
                type: '[Todo Component] WriteSortedData',
                payload: {
                  data: loadedData,
                  sortDirection: sortParams.sortDirection,
                  sortColumn: sortParams.sortColumn,
                },
              };
            }),
            catchError((err) =>
              of({
                type: '[Todo Component] OperationError',
                payload: { requireLoad: false, error: err },
              })
            )
          )
      )
    )
  );

  writeSortedData$ = createEffect(() =>
    this.actions$.pipe(
      //error: forwarding action payload instead of result
      ofType('[Todo Component] WriteSortedData'),
      map((action) => {
        //sort logic
        console.log('sorting data', action.payload.data);
        if (
          (action.payload.sortColumn || action.payload.sortDirection) &&
          action.payload.data
        ) {
          return {
            type: '[Todo Component] OperationSuccess',
            payload: {
              requireLoad: false,
              data: [...action.payload.data].sort((a, b) => {
                const res = compare(
                  a[action.payload.sortColumn],
                  b[action.payload.sortColumn]
                );
                switch(action.payload.sortDirection){
                  case 'asc':{
                    return res;
                  }
                  case 'desc':{
                    return -res;
                  }
                  default:{
                    return res;
                  }
                }
              }),
            },
          };
        } else {
          console.log('No sort column provided', action.payload);
          return {
            type: '[Todo Component] OperationSuccess',
            payload: { requireLoad: false, data: action.payload.data},
          };
        }
      })
    )
  );

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo Component] AddEntry'),
      switchMap((action) =>
        this.httpService
          .postData(`${this.serverUrl}/${this.urls.createUrl}`, action.payload.data)
          .pipe(
            map(() => ({
              type: '[Todo Component] OperationSuccess',
              payload: { requireLoad: true },
            })),
            catchError((err) =>
              of({
                type: '[Todo Component] OperationError',
                payload: { requireLoad: true, error: err },
              })
            )
          )
      )
    )
  );
  deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo Component] DeleteEntry'),
      switchMap((action) =>
        this.httpService
          .postData(
            `${this.serverUrl}/${this.urls.createUrl}/${action.id}`,
            undefined
          )
          .pipe(
            map(() => ({
              type: '[Todo Component] OperationSuccess',
              payload: { requireLoad: true },
            })),
            catchError((err) =>
              of({
                type: '[Todo Component] OperationError',
                payload: { requireLoad: true, error: err },
              })
            )
          )
      )
    )
  );
  updateEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo Component] UpdateEntry'),
      switchMap((action) =>
        this.httpService
          .postData(
            `${this.serverUrl}/${this.urls.updateUrl}/${action.payload.id}`,
            action.payload.data
          )
          .pipe(
            map(() => ({
              type: '[Todo Component] OperationSuccess',
              payload: { requireLoad: true },
            })),
            catchError((err) =>
              of({
                type: '[Todo Component] OperationError',
                payload: { requireLoad: true, error: err },
              })
            )
          )
      )
    )
  );

  operationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo Component] OperationSuccess'),
      map((action) => {
        if (!action.payload.requireLoad) {
          console.log('writingData from success op', action.payload.data);
          return {
            type: '[Todo Component] WriteData',
            payload: { data: action.payload.data },
          };
        } else {
          return { type: '[Todo Component] GetData' };
        }
      })
    )
  );
}

function sortParametersSelector(storeData: any) {
  console.log('store sort selector', storeData);
  return {
    sortDirection: storeData.sortReducer.sortDirection,
    sortColumn: storeData.sortReducer.sortDirection,
  }
}