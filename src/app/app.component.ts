import { Component, OnInit } from '@angular/core';
import { invokeJobsAPI } from './jobs/store/jobs.action';
import { selectJobs } from './jobs/store/jobs.selector';
import { JobReducer } from './jobs/store/jobs.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}
  books! : any[]
  books$ = this.store.pipe(select(selectJobs));

 
  ngOnInit(): void {
    this.store.dispatch(invokeJobsAPI());
  }

  title = 'job-listings';

  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
}
