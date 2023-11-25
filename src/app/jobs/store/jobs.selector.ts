import { createFeatureSelector } from '@ngrx/store';
import { Job } from '../../interfaces/jobInterface';
 
export const selectJobs = createFeatureSelector<Job[]>('joblistings');
