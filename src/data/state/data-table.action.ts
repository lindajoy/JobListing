import { createAction, props } from '@ngrx/store';
import { Job } from 'src/app/interfaces/jobInterface';

enum Actions {
  SET_DATA_TABLE = '[Data Table] Set Table Data',
  SET_SORT_KEY = '[Data Table] Set Sort Key',
  RESET_DATATABLE_STORE = '[Data Table] Reset Store',
  SET_FILTER_BY = '[Data Table] Set Filter By Properties and Query', 
  ADD_NEW_JOB= 'Adds a new JOB!'
}

export const setData = createAction(Actions.SET_DATA_TABLE, props<{ data: Job[] }>());
export const setSortKey = createAction(Actions.SET_SORT_KEY, props<{ sortKey: string }>());
export const resetDataTableStore = createAction(Actions.RESET_DATATABLE_STORE);
export const addNewJob = createAction(Actions.ADD_NEW_JOB, props< {newJob: any }>());

export const setFilterBy = createAction(Actions.SET_FILTER_BY, props<{ filters: { filterBy: string[]; query: string } }>()); 