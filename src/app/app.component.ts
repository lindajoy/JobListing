import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { invokeJobsAPI, setFilterBy } from './jobs/store/jobs.action';
import { selectJobs } from './jobs/store/jobs.selector';
import { JobReducer } from './jobs/store/jobs.reducer';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');

  constructor(private store: Store) {}
  jobs$ = this.store.pipe(select(selectJobs));
  job!: any[];

  ngOnInit(): void {
    this.jobs$.subscribe((a) => (this.job = a));
    console.log(this.job);
    this.store.dispatch(invokeJobsAPI());

    this.searchControl.valueChanges.subscribe((query) => {
      console.log('Search Query', query);
    });

    this.searchControl.valueChanges
      .pipe(map((query) => (query as string).toLowerCase()))
      .subscribe((query) => {
         console.log("Here is my search string", query)
         this.store.dispatch(setFilterBy({ filters: { filterBy: ['location', 'jobTitle', 'companyName'], query } }));
      });
  }

  ngOnDestroy(): void {}
}
