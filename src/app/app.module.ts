import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import  { JobReducer } from './jobs/store/jobs.reducer';
import  { JobsEffect  } from './jobs/store/jobs.effect';
import {  HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from "./components/data-table/data-table.component";
import { DataModule } from '../data/data.module';
import { DataTableEffects } from '../data/state/data-table.effect';
import { dataTableReducer } from '../data/state';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations: [
        AppComponent, DataTableComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        DataModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([DataTableEffects]),
        EffectsModule.forFeature([JobsEffect]),
        StoreModule.forFeature('joblistings', JobReducer),
        StoreModule.forFeature('dataTable',dataTableReducer ),

        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ]
})
export class AppModule { }
