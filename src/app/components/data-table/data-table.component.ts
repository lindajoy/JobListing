import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as dataTableActions from '../../../data/state/data-table.action';
import * as dataTableSelectors from '../../../data/state/data-table.selector';
import { DataTableState } from 'src/app/interfaces/jobInterface';
import { setFilterBy } from '../../../data/state/data-table.action';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  @Input() data!: any[];
  @Input() headerRow!: any[];
  countries!: string[];
  jobTitle!: string[];
  locations!: string[];
  filteredData!: any[]

  public sortDirection$!: Observable<string>;
  public sortKey$!: Observable<string>;
  public tableData$!: Observable<any>;
  private sortKeySubject = new BehaviorSubject<string>('createdOn');


  constructor(private store: Store<DataTableState>) {}
  headers = ['Job Title', 'Company Name', 'Job Type','Location' ,'Description'];

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

  reset (){
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
    this.tableData$.subscribe(a => this.filteredData = a)
    this.store.dispatch(dataTableActions.setData({ data: this.filteredData }));
    // this.tableData$ = this.store.select(dataTableSelectors.selectData);
  }

  ngOnDestroy(): void {
    this.store.dispatch(dataTableActions.resetDataTableStore());
  }
}
