import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadPayload } from '../models/lead-payload';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeadService {
  // later we can move this to environment.ts
  private readonly baseUrl = 'http://localhost:8080/api/leads';

  constructor(private http: HttpClient) {}

  createLead(payload: LeadPayload): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}