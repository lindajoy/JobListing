import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as DataTableActions from './data-table.action';

@Injectable()
export class DataTableEffects {
  constructor(private actions$: Actions) {}

}