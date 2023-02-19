import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
	IModelTodoCreateForm,
	IModelTodoGet,
	IModelTodoUpdateForm,
} from './types';
import { catchError, throwError, Observable, map } from 'rxjs';

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
	public getData<T>(url: string): Observable<T | Error> {
		return this.http.get<T>(url).pipe(catchError(this.handleError));
	}
	public postData<T>(
		url: string,
		data: string | IModelTodoCreateForm | IModelTodoUpdateForm
	): Observable<T | Error> {
		return this.http.post<T>(url, data).pipe(catchError(this.handleError));
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
		return this.httpService
			.getData<IModelTodoGet[]>(`${this.serverUrl}/${this.urls.getUrl}`)
			.pipe(
				map((data: IModelTodoGet[] | Error) => {
					if (data instanceof Error) {
						return [];
					} else {
						return data;
					}
				})
			);
	}
	public createTodo(
		todoContent: IModelTodoCreateForm
	): Observable<IModelTodoGet> {
		return this.httpService
			.postData<IModelTodoGet>(
				`${this.serverUrl}/${this.urls.createUrl}`,
				todoContent
			)
			.pipe(
				map((data: IModelTodoGet | Error) => {
					if (data instanceof Error) {
						return {
							id: '',
							name: '',
							createdDate: '',
							updatedDate: '',
							link: '',
							comment: '',
							tags: [],
						};
					} else {
						return data;
					}
				})
			);
	}
	public updateTodo(
		id: string,
		todoContent: IModelTodoUpdateForm
	): Observable<IModelTodoGet> {
		return this.httpService
			.postData<IModelTodoGet>(
				`${this.serverUrl}/${this.urls.updateUrl}/${id}`,
				todoContent
			)
			.pipe(
				map((data: IModelTodoGet | Error) => {
					if (data instanceof Error) {
						return {
							id: '',
							name: '',
							createdDate: '',
							updatedDate: '',
							link: '',
							comment: '',
							tags: [],
						};
					} else {
						return data;
					}
				})
			);
	}
	public deleteTodo(id: string): Observable<string> {
		return this.httpService
			.getData<string>(`${this.serverUrl}/${this.urls.removeUrl}/${id}`)
			.pipe(
				map((data: string | Error) => {
					if (data instanceof Error) {
						return 'Error';
					} else {
						return data;
					}
				})
			);
	}
}
