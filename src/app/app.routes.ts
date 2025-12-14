import { Routes } from '@angular/router';
import { ProjectPageComponent } from './project-page/project-page.component';

export const routes: Routes = [
  { path: '', component: ProjectPageComponent },         // home
  { path: 'p/:slug', component: ProjectPageComponent },  // later for multiple projects
];