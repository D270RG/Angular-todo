//--Element model--
export interface ITodoElement {
	id: string;
	name: string;
	createdDate: string;
	updatedDate: string;
	link: string;
	comment: string;
	tags: string[];
}

//--CRUD models--
export interface IModelTodoGet extends ITodoElement {}
export interface IModelTodoCreateForm
	extends Omit<ITodoElement, 'createdDate' | 'updatedDate' | 'id'> {}

export interface IModelTodoUpdateForm extends Omit<ITodoElement, 'id'> {}

export interface IModelTodoDeleteForm {
	id: string;
}

//--Error model
export interface IOperationError {
	message: string;
	code: string;
	issues: {
		message: string;
	};
}

//--Sort models
export interface ISortData {
	field: keyof ITodoElement;
	direction: 'asc' | 'desc' | '';
}
