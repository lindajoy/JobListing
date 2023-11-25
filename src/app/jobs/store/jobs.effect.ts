// export class JobsEffect {
// }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { JobService } from '../../services/jobs.service';
import { jobsFetchAPISuccess , invokeJobsAPI  } from './jobs.action';
import { selectJobs } from './jobs.selector';
 
@Injectable()
export class JobsEffect {
  constructor(
    private actions$: Actions,
    private jobService: JobService,
    private store: Store
  ) {}
 
  loadAllJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeJobsAPI),
      withLatestFrom(this.store.pipe(select(selectJobs))),
      mergeMap(([, jobfromstore]) => {
        if (jobfromstore.length > 0) {
            debugger;
          return EMPTY;
        }
        return this.jobService
          .get()
          .pipe(map((data) => jobsFetchAPISuccess({ allJobs: data })));
      })
    )
  );
}