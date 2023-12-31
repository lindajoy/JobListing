export interface Job {
  id: string;
  location: string;
  jobTitle: string;
  companyName: string;
  jobType: string;
  description: string;
  createdon:string;
}

export interface DataTableState {
  tableData: any[];
  sortDirection: string;
  sortKey: string;
  filterQuery: string;
  filterBy: string[];
}
