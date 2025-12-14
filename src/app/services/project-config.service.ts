import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectConfig } from '../models/project-config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectConfigService {
  constructor(private http: HttpClient) {}

  getProject(slug: string): Observable<ProjectConfig> {
    return this.http.get<ProjectConfig>(`assets/projects/${slug}.json`);
  }
}