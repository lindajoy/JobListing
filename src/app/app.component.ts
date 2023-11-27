import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { invokeJobsAPI } from './jobs/store/jobs.action';
import { selectJobs } from './jobs/store/jobs.selector';
import { setFilterBy } from '../data/state/data-table.action'
import { JobReducer } from './jobs/store/jobs.reducer';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { JobService } from './services/jobs.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  private subs = new SubSink();
  headerRow = [
    { header: 'Date Posted', key: 'createdOn', hasSort: true },
    { header: 'Company', key: 'companyName ', hasSort: false },
    { header: 'Job Title', key: 'jobTitle', hasSort: false },
    { header: 'JobType', key: 'jobType', hasSort: false},
    { header: 'Location', key: 'location', hasSort: true },
    { header: 'Description', key: 'description', hasSort: false },
  ];

  constructor(private store: Store, private jobService: JobService) {}
  jobs$ = this.store.pipe(select(selectJobs));
  data$!: Observable<any[] | null>;
  job!: any[];

  ngOnInit(): void {
    this.jobs$.subscribe((a) => (this.job = a));
    this.store.dispatch(invokeJobsAPI());

    this.data$ = this.jobService.get()
                     .pipe(startWith(null));

    this.searchControl.valueChanges
      .pipe(map((query) => (query as string).toLowerCase()))
      .subscribe((query) => {
        this.store.dispatch(
          setFilterBy({
            filters: {
              filterBy: ['location', 'jobTitle', 'companyName', 'description', 'jobType'],
              query,
            },
          })
        );
      });
  }

  someMethod(value: string) {
    const query = value.trim().toLocaleLowerCase();
    this.store.dispatch(
      setFilterBy({
        filters: {
          filterBy: ['location'],
          query
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
