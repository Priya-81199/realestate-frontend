import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeadService } from '../services/lead.service';
import { LeadPayload } from '../models/lead-payload';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss'],
})
export class LeadFormComponent {
  @Input() projectSlug!: string;
  @Input() projectName!: string;

  @Input() utmSource?: string;
  @Input() utmMedium?: string;
  @Input() utmCampaign?: string;
  @Input() gclid?: string;
  @Input() userAgent?: string;

  form: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: [''],
      message: [''],
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid || !this.projectSlug || !this.projectName) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const payload: LeadPayload = {
      projectSlug: this.projectSlug,
      projectName: this.projectName,
      name: value.name,
      phone: value.phone,
      email: value.email,
      message: value.message,
      utmSource: this.utmSource,
      utmMedium: this.utmMedium,
      utmCampaign: this.utmCampaign,
      gclid: this.gclid,
      userAgent: this.userAgent,
    };

    this.submitting = true;

    this.leadService.createLead(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Thank you! We will call you shortly.';
        this.form.reset();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}