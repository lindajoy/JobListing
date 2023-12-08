import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import * as dataTableActions from '../../data/state/data-table.action';
import * as dataTableSelectors from '../../data/state/data-table.selector';
import { DataTableState } from '../interfaces/jobInterface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrl: './addform.component.scss'
})
export class AddformComponent {
    addJobForm = new FormGroup({
              id: new FormControl(),
              jobTitle: new FormControl(),
              companyName: new FormControl(),
              jobType: new FormControl(),
              location: new FormControl(),
              description: new FormControl(),
            });

  constructor(private store: Store<DataTableState>) {}

  onSubmit (addJobForm: NgForm) { 
    this.store.dispatch(dataTableActions.addNewJob({ newJob: addJobForm.value }));
  }


}
