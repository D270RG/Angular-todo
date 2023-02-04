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
	constructor(private http: HttpClient) {}
	private handleError(error: HttpErrorResponse) {
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
	getData<T>(url: string): HttpResponse {
		return this.http.get<T>(url);
	}
	postData(url: string, data: string | Object | JSON): HttpResponse {
		return this.http.post(url, data).pipe(catchError(this.handleError));
	}
}
@Injectable()
export class HttpModule {
	serverUrl = 'http://localhost:3000/api';
	urls = {
		getUrl: 'get-garbages',
		removeUrl: 'remove-garbage',
		updateUrl: 'update-garbage',
		createUrl: 'create-garbage',
	};
	constructor(private httpService: HttpService) {}
	getTodos(): Observable<IModelTodoGet> {
		return this.httpService.getData<IModelTodoGet>(
			`${this.serverUrl}/${this.urls.getUrl}`
		);
	}
	createTodo(todoContent: IModelTodoCreateForm): Observable<IModelTodoGet> {
		console.log('posting', todoContent);
		return this.httpService.postData(
			`${this.serverUrl}/${this.urls.createUrl}`,
			todoContent
		);
	}
	updateTodo(
		id: string,
		todoContent: IModelTodoUpdateForm
	): Observable<IModelTodoGet> {
		return this.httpService.postData(
			`${this.serverUrl}/${this.urls.updateUrl}/${id}`,
			todoContent
		);
	}
	deleteTodo(id: string): Observable<string> {
		return this.httpService.getData(
			`${this.serverUrl}/${this.urls.removeUrl}/${id}`
		);
	}
}
