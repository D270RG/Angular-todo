import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
	IModelTodoCreateForm,
	IModelTodoGet,
	IModelTodoUpdateForm,
} from './types';
import { catchError, throwError, retry, Observable } from 'rxjs';

type HttpResponse = Observable<any>;
@Injectable()
export class HttpService {
	public constructor(private http: HttpClient) {}
	private handleError(error: HttpErrorResponse): Observable<Error> {
		if (error.status === 0) {
			console.error('An error occurred:', error.error);
		} else {
			console.error(
				`Backend returned code ${error.status}, body was: `,
				error.error
			);
		}
		return throwError(
			() => new Error('Something bad happened; please try again later.')
		);
	}
	public getData<T>(url: string): HttpResponse {
		return this.http.get<T>(url).pipe(catchError(this.handleError));
	}
	public postData(url: string, data: string | object | JSON): HttpResponse {
		return this.http.post(url, data).pipe(catchError(this.handleError));
	}
}
@Injectable()
export class HttpModule {
	private serverUrl = 'http://localhost:3000/api';
	private urls = {
		getUrl: 'get-garbages',
		removeUrl: 'remove-garbage',
		updateUrl: 'update-garbage',
		createUrl: 'create-garbage',
	};

	public constructor(private httpService: HttpService) {}
	public getTodos(): Observable<IModelTodoGet[]> {
		return this.httpService.getData<IModelTodoGet[]>(
			`${this.serverUrl}/${this.urls.getUrl}`
		);
	}
	public createTodo(
		todoContent: IModelTodoCreateForm
	): Observable<IModelTodoGet> {
		console.log('posting', todoContent);
		return this.httpService.postData(
			`${this.serverUrl}/${this.urls.createUrl}`,
			todoContent
		);
	}
	public updateTodo(
		id: string,
		todoContent: IModelTodoUpdateForm
	): Observable<IModelTodoGet> {
		return this.httpService.postData(
			`${this.serverUrl}/${this.urls.updateUrl}/${id}`,
			todoContent
		);
	}
	public deleteTodo(id: string): Observable<string> {
		return this.httpService.getData(
			`${this.serverUrl}/${this.urls.removeUrl}/${id}`
		);
	}
}
