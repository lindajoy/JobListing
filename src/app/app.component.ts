import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { setFilterBy } from '../data/state/data-table.action'
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
    { header: 'Description', key: 'description', hasSort: true },
  ];

  constructor(private store: Store, private jobService: JobService) {}
  data$!: Observable<any[] | null>;
  job!: any[];

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
