import { createReducer, on } from '@ngrx/store';
import { Job } from '../../interfaces/jobInterface';
import { jobsFetchAPISuccess, setFilterBy } from './jobs.action';
import * as DataTableActions from './jobs.action';

export const initialState: ReadonlyArray<Job> = [];
export const INITIAL_FILTER_KEY = { filterKey: '', query: '' };
export const dataTableFeatureKey = 'joblistings';



export const JobReducer = createReducer(
  initialState,
  on(jobsFetchAPISuccess, (state, { allJobs }) => {
    return allJobs;
  }),

  on(setFilterBy, (state, { filters }) => {
    const { filterBy, query } = filters;
    if (filterBy.length === 0 || query.trim() === '') {
      return state;
    }

    return state.filter(job => {
        return job.companyName.toLowerCase().includes(query.toLowerCase()) ||  job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) || job.jobTitle.toLowerCase().includes(query.toLowerCase());
      });
    
    })

)