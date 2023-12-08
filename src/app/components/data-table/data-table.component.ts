import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as dataTableActions from '../../../data/state/data-table.action';
import * as dataTableSelectors from '../../../data/state/data-table.selector';
import { DataTableState, Job } from 'src/app/interfaces/jobInterface';
import { setFilterBy } from '../../../data/state/data-table.action';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  @Input() data!: Job[];
  @Input() headerRow!: any[];
  
  filteredData!: any[]
  private subs = new SubSink();

  public sortDirection$!: Observable<string>;
  public sortKey$!: Observable<string>;
  public tableData$!: Observable<any>;
  
  constructor(private store: Store<DataTableState>) {}

  ngOnInit(): void {
    this.store.dispatch(dataTableActions.setData({ data: this.data }));
    this.tableData$ = this.store.select(dataTableSelectors.selectData);
    this.sortKey$ = this.store.select(dataTableSelectors.selectSortKey);
    this.sortDirection$ = this.store.select(dataTableSelectors.selectSortDirection);
  }

  public onSort(headerItem:any): void {
    if (!headerItem.hasSort) {
      return;
    }
    const sortKey = headerItem.key;
    this.store.dispatch(dataTableActions.setSortKey({ sortKey: sortKey }));
  }

  dateConverter(unix: number) {
    const date = new Date(unix);
    return date.toLocaleDateString('en-US')
   }

  reset() {
    this.store.dispatch(dataTableActions.resetDataTableStore());
    this.store.dispatch(dataTableActions.setData(({ data: this.data })));
  }

  uniqueJobTypes(data: any[], prop:string): string[] {
    const uniqueJobTypesSet = new Set<string>();
    data.forEach(row => {
      uniqueJobTypesSet.add(row[prop].trim());
    });
    return Array.from(uniqueJobTypesSet);
  }

  filterByField(value: string, prop: string) {
    const query = value.trim().toLocaleLowerCase();
    this.store.dispatch(
      setFilterBy({
        filters: {
          filterBy: [prop],
          query
        },
      })
    );
    this.tableData$.subscribe(filtered => this.filteredData = filtered);
    this.store.dispatch(dataTableActions.setData({ data: this.filteredData }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(dataTableActions.resetDataTableStore());
    this.subs.unsubscribe();
  }
}
