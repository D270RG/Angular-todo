import { Component, OnInit } from '@angular/core';
import { ITodoElement } from 'src/app/types';
import { select, Store } from '@ngrx/store';
import * as Actions from 'src/app/storage/actions';
import * as Selectors from 'src/app/storage/selectors';
import { RootState } from 'src/app/storage/reducers';

@Component({
	selector: 'todoList',
	templateUrl: 'todoList.component.html',
	styleUrls: ['todoList.component.scss'],
})
export class TodoListComponent implements OnInit {
	todoListDataObservable$ = this.store.pipe(select(Selectors.selectTodoValues));
	todoListData = <ITodoElement[]>[];
	formVisible: string;

	setFormVisible(value: string) {
		this.formVisible = value;
	}
	deleteForm(id: string) {
		this.store.dispatch(Actions.deleteEntry({ data: { id: id } }));
	}
	preventFalltrough(event: MouseEvent) {
		event.stopPropagation();
		console.log('stop propagation');
	}

	constructor(private store: Store<RootState>) {
		this.formVisible = 'none';
		this.todoListDataObservable$.subscribe((todoListData: ITodoElement[]) => {
			this.todoListData = todoListData;
		});
		this.store.dispatch(Actions.getData());
	}

	ngOnInit() {}
}
