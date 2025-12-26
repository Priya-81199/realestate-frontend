import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadPayload } from '../models/lead-payload';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadService {

  private readonly baseUrl = `${environment.apiBaseUrl}/api/leads`;

  constructor(private http: HttpClient) {}

  createLead(payload: LeadPayload): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}