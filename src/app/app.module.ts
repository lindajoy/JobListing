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
@NgModule({
    declarations: [
        AppComponent
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
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([JobsEffect]),
        StoreModule.forFeature('joblistings', JobReducer),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        DataTableComponent
    ]
})
export class AppModule { }
