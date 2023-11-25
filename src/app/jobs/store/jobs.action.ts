import { createAction, props } from '@ngrx/store';
import { Job } from 'src/app/interfaces/jobInterface';
 
export const invokeJobsAPI = createAction(
  '[Jobs API] Invoke Jobs Fetch API'
);
 
export const jobsFetchAPISuccess = createAction(
  '[Jobs API] Fetch API Success',
  props<{ allJobs: Job[] }>()
);