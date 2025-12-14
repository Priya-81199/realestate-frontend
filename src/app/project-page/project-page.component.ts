import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectConfig } from '../models/project-config';
import { ProjectConfigService } from '../services/project-config.service';
import { LeadFormComponent } from '../lead-form/lead-form.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, LeadFormComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  project?: ProjectConfig;
  loading = true;
  error?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  userAgent: string = navigator.userAgent;
  safeMapUrl?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectConfigService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    const slug =
      this.route.snapshot.paramMap.get('slug') || 'godrej-kharghar';

    // Read query params for UTM / gclid
    const queryParams = this.route.snapshot.queryParamMap;
    this.utmSource = queryParams.get('utm_source') || undefined;
    this.utmMedium = queryParams.get('utm_medium') || undefined;
    this.utmCampaign = queryParams.get('utm_campaign') || undefined;
    this.gclid = queryParams.get('gclid') || undefined;

    this.projectService.getProject(slug).subscribe({
      next: (cfg) => {
        console.log('Project loaded', cfg);
        this.project = cfg;

        if (cfg.locationInfo?.mapEmbedUrl) {
          this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            cfg.locationInfo.mapEmbedUrl
          );
        }

        if (cfg.seo) {
          this.title.setTitle(cfg.seo.title);

          this.meta.updateTag({
            name: 'description',
            content: cfg.seo.description,
          });

          this.meta.updateTag({
            property: 'og:title',
            content: cfg.seo.title,
          });

          this.meta.updateTag({
            property: 'og:description',
            content: cfg.seo.description,
          });

          if (cfg.seo.image) {
            this.meta.updateTag({
              property: 'og:image',
              content: window.location.origin + '/' + cfg.seo.image,
            });
          }

          this.meta.updateTag({
            property: 'og:type',
            content: 'website',
          });
        }

        this.loading = false;
        this.error = undefined;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading project', err);
        this.error = 'Project not found';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  scrollToLeadForm(): void {
    const el = document.getElementById('lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getAmenityIcon(key: string): string {
    const icons: Record<string, string> = {
      swimming_pool: '🏊',
      gym: '🏋️',
      kids_play: '🧸',
      garden: '🌳',
      security: '🛡️',
      parking: '🚗',
    };

    return icons[key] || '✔️';
  }

}