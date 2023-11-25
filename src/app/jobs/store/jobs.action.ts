import { createAction, props } from '@ngrx/store';
import { Job } from 'src/app/interfaces/jobInterface';

enum Actions {
    SET_DATA_TABLE = '[Data Table] Set Table Data',
    SET_SORT_KEY = '[Data Table] Set Sort Key',
    RESET_DATATABLE_STORE = '[Data Table] Reset Store',
    SET_FILTER_BY = '[Data Table] Set Filter By Properties and Query', 
  }
 
export const invokeJobsAPI = createAction(
  '[Jobs API] Invoke Jobs Fetch API'
);
 
export const jobsFetchAPISuccess = createAction(
  '[Jobs API] Fetch API Success',
  props<{ allJobs: Job[] }>()
);

export const setFilterBy = createAction('[Job Listing] Set Filter By Properties and Query', props<{ filters: { filterBy: string[]; query: string } }>()); 