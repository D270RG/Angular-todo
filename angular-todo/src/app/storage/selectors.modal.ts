import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalState } from './reducers.modal';

export const selectForm = createFeatureSelector<ModalState>('modal');
export const selectFormType = createSelector(
	selectForm,
	(state) => state.formType
);
export const selectFormId = createSelector(selectForm, (state) => state.formId);
