import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../interfaces/jobInterface';

@Injectable({
  providedIn: 'root',
})

export class JobService {
  constructor(private http: HttpClient) {}

  get() { 
    return this.http.get<Job[]>('http://localhost:3000/jobs');
  }

}