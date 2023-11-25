import { createReducer, on } from "@ngrx/store";
import { Job } from "../../interfaces/jobInterface";
import { jobsFetchAPISuccess } from "./jobs.action";

export const initialState: ReadonlyArray<Job> = [];

export const JobReducer =  createReducer(initialState, 
    on(jobsFetchAPISuccess, (state, { allJobs }) => {
        debugger;
      return allJobs;
    }));
