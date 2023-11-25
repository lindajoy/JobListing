import { createFeatureSelector, createSelector  } from '@ngrx/store';
import { Job } from '../../interfaces/jobInterface';

 
export const selectJobs = createFeatureSelector<Job[]>('joblistings');

// export const selectTableData = createSelector(selectJobs, (state:Job[]) => state);

// export const selectFilterQuery = createSelector(selectJobs, (state: Job[]) => state);
// export const selectFilterBy = createSelector(selectJobs, (state: Job[]) => state);
// export const selectSortKey = createSelector(selectJobs, (state: Job[]) => state);

// export const selectSortDirection = createSelector(selectJobs, (state: Job[]) => state);

// export const selectData = createSelector(
//     selectTableData,
//     selectSortDirection,
//     selectSortKey,
//     selectFilterQuery,
//     selectFilterBy,
//     (tableData, sortDirection, sortKey, filterQuery, filterBy) => {
//       let filteredData = [...tableData];
  
//       // Filter Array
//       if (filterQuery !== '') {
//         filteredData = filteredData.filter((item) => {
//           const result = filterBy
//             .map((filterBy) => {
//               return item[filterBy]?.toLowerCase().includes(filterQuery);
//             })
//             .some((item) => item);
//           return result;
//         });
//       }
  
//       if (sortDirection === '') {
//         return filteredData;
//       }
  
//       const sortedData = [...filteredData].sort((a, b) => {
//         const paramA = a[sortKey];
//         const paramB = b[sortKey];
//         return compare(paramA, paramB, sortDirection);
//       });
//       return sortedData;
//     }
//   );
  
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
