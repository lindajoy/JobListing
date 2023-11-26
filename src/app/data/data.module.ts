import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DataTableModule } from './state/data-table.module';
import { dataTableReducer } from './state';
import { DataTableEffects } from './state/data-table.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forFeature('dataTable',  dataTableReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([DataTableEffects]),
    DataTableModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10, 
      autoPause: true, 
    }),
  ]
  
})
export class DataModule { }
