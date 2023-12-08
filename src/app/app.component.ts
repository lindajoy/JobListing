import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { setFilterBy } from '../data/state/data-table.action'
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { JobService } from './services/jobs.service';
import { SubSink } from 'subsink';
import { Job } from './interfaces/jobInterface';
import { AddformComponent } from './addform/addform.component';

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

  constructor(private store: Store, 
              private jobService: JobService,
              public dialog: MatDialog) {}
  data$!: Observable<Job[] | null>;
  job!: Job[];

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddformComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
