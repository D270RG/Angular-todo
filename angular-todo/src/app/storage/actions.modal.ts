import { createAction, props } from '@ngrx/store';
import { FormType } from '../types';

export const setForm = createAction(
	'setForm',
	props<{ formId: string; formType: FormType }>()
);
export const setFormId = createAction('setFormId', props<{ formId: string }>());
export const setFormType = createAction(
	'setFormType',
	props<{ formType: FormType }>()
);
