import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as dataTableActions from '../../data/state/data-table.action';
import * as dataTableSelectors from '../../data/state/data-table.selector';
import { DataTableState } from 'src/app/interfaces/jobInterface';
import { setFilterBy } from '../../data/state/data-table.action';


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

  ngOnDestroy(): void {
    this.store.dispatch(dataTableActions.resetDataTableStore());
  }

 
  public onSort(headerItem:any): void {
    if (!headerItem.hasSort) {
      return;
    }
    const sortKey = headerItem.key;
    this.store.dispatch(dataTableActions.setSortKey({ sortKey: sortKey }));
  }

   handleSelection(selectedItem: string) {
    // Perform actions based on the selected item
    console.log("Selected:", selectedItem);
    // You can add any custom logic here
  }

  reset (){
    this.store.dispatch(dataTableActions.resetDataTableStore());
    this.store.dispatch(dataTableActions.setData(({ data: this.data })));
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
  }
}
