import { createReducer, on } from '@ngrx/store';
import { FormType } from '../types';
import * as actions from './actions.modal';

export interface ModalState {
	formType: FormType;
	formId: string;
}

export const ModalInitialState: ModalState = {
	formType: 'none',
	formId: '',
};

export const modalReducer = createReducer(
	ModalInitialState,
	on(actions.setFormType, (state, action) => {
		console.log('set form type', state);
		return {
			...state,
			formType: action.formType,
		};
	}),
	on(actions.setFormId, (state, action) => {
		return {
			...state,
			formId: action.formId,
		};
	}),
	on(actions.setForm, (state, action) => {
		console.log('set form', state);
		return {
			...state,
			formId: action.formId,
			formType: action.formType,
		};
	})
);
