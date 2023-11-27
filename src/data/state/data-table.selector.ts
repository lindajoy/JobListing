import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataTableState } from '../../app/interfaces/jobInterface';
import * as fromDataTable from './data-table.reducer';

export const selectDataTableState = createFeatureSelector<DataTableState>(fromDataTable.dataTableFeatureKey);

export const selectSortDirection = createSelector(selectDataTableState, (state: DataTableState) => state.sortDirection);
export const selectSortKey = createSelector(selectDataTableState, (state: DataTableState) => state.sortKey);
export const selectTableData = createSelector(selectDataTableState, (state: DataTableState) => state.tableData);

export const selectFilterQuery = createSelector(selectDataTableState, (state: DataTableState) => state.filterQuery);
export const selectFilterBy = createSelector(selectDataTableState, (state: DataTableState) => state.filterBy);

export const selectData = createSelector(
  selectTableData,
  selectSortDirection,
  selectSortKey,
  selectFilterQuery,
  selectFilterBy,
  (tableData, sortDirection, sortKey, filterQuery, filterBy) => {
    console.log(tableData);
    let filteredData = [...tableData];
    // Filter Array
    if (filterQuery !== '') {
      console.log('Filtered data here!', filteredData);
      filteredData = filteredData.filter((item) => {
        const result = filterBy
          .map((filterBy) => {
            console.log(filterBy);
            console.log(item[filterBy]);
            console.log(item[filterBy]?.toLowerCase().includes(filterQuery));

            return item[filterBy]?.toLowerCase().includes(filterQuery);

          })
          .some((item) => item);
        return result;
      });
    }

    filteredData =  filteredData;

    if (sortDirection === '') {
      return filteredData;
    }

    const sortedData = [...filteredData].sort((a, b) => {
      const paramA = a[sortKey];
      const paramB = b[sortKey];
      return compare(paramA, paramB, sortDirection);
    });
    return sortedData;
  }
);

// Utils
export function compare(a: any, b: any, sortDirection: string): number {
  if (a > b) {
    return sortDirection === 'asc' ? 1 : -1;
  }
  if (a < b) {
    return sortDirection === 'desc' ? 1 : -1;
  }
  return 0;
}